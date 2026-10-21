from __future__ import annotations

import hashlib
import importlib.util
import io
import json
import math
import subprocess
import sys
import wave
import zipfile
from pathlib import Path

import numpy as np
from numpy.typing import NDArray


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "exports"
WORK = ROOT / ".work"
TRACK = ROOT / "assets" / "cat-walk-arulo-mixkit-371.mp3"
RATE = 48_000
DURATION = 45
BPM = 120
FloatArray = NDArray[np.float64]
PRESERVED_FROM = 34.5
APPROVED_ARCHIVE = ROOT / "history" / "v4-revision-04.zip"
sys.dont_write_bytecode = True


def instruments():
    specification = importlib.util.spec_from_file_location("sound_palette", ROOT / "source" / "sound-palette.py")
    if specification is None or specification.loader is None:
        raise RuntimeError("Palette de bruitages introuvable")
    module = importlib.util.module_from_spec(specification)
    specification.loader.exec_module(module)
    return module


def add(track: FloatArray, signal: FloatArray, start: float, gain: float, pan: float = 0) -> None:
    offset = round(start * RATE)
    if offset < 0 or offset >= len(track):
        return
    length = min(len(signal), len(track) - offset)
    angle = (pan + 1) * math.pi / 4
    track[offset:offset + length, 0] += signal[:length] * gain * math.cos(angle)
    track[offset:offset + length, 1] += signal[:length] * gain * math.sin(angle)


def read_wav(filename: Path) -> FloatArray:
    with wave.open(str(filename), "rb") as source:
        if source.getframerate() != RATE or source.getnchannels() != 2 or source.getsampwidth() != 2:
            raise ValueError("Format PCM inattendu")
        return np.frombuffer(source.readframes(source.getnframes()), dtype="<i2").reshape(-1, 2).astype(np.float64) / 32767


def write_wav(filename: Path, samples: FloatArray) -> None:
    pcm = np.rint(np.clip(samples, -0.999, 0.999) * 32767).astype("<i2")
    with wave.open(str(filename), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(RATE)
        output.writeframes(pcm.tobytes())


def approved_track(name: str) -> FloatArray:
    with zipfile.ZipFile(APPROVED_ARCHIVE) as archive:
        entry = next(entry for entry in archive.namelist() if entry.endswith("exports/" + name))
        with wave.open(io.BytesIO(archive.read(entry)), "rb") as audio:
            return np.frombuffer(audio.readframes(audio.getnframes()), dtype="<i2").reshape(-1, 2).astype(np.float64) / 32767


def edit_music() -> FloatArray:
    WORK.mkdir(exist_ok=True)
    retimed = WORK / "cat-walk-120.wav"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", str(TRACK), "-af", "atempo=0.9230769231", "-ar", str(RATE), "-ac", "2", "-c:a", "pcm_s16le", str(retimed)], check=True)
    source = read_wav(retimed)
    music = np.zeros((DURATION * RATE, 2))
    join = round(PRESERVED_FROM * RATE)
    previous = approved_track("musique-mixkit-montage.wav")
    comparison = source[33 * RATE:34 * RATE, 0]
    approved_level = float(np.dot(previous[5 * RATE:6 * RATE, 0], comparison) / np.dot(comparison, comparison))
    times = np.arange(join) / RATE
    increase = np.clip((times - 11.7) / 12.3, 0, 1)
    levels = approved_level * (1 + increase * 0.2)
    music[:join] = source[28 * RATE:28 * RATE + join] * levels[:, None]
    music[:round(11.7 * RATE)] = previous[:round(11.7 * RATE)]
    cross_start = round(33.75 * RATE)
    incoming = source[round(95.25 * RATE):96 * RATE] * (0.76 * approved_level / 0.74)
    cross = np.linspace(0, 1, join - cross_start)[:, None]
    music[cross_start:join] = music[cross_start:join] * (1 - cross) + incoming * cross
    music[join:] = previous[join:]
    typing_start = round(31.2 * RATE)
    typing_end = round(32.4 * RATE)
    window = np.sin(np.linspace(0, math.pi, typing_end - typing_start)) ** 2
    music[typing_start:typing_end] *= (1 - window * 0.28)[:, None]
    return music


def sound_design(tones, cues: dict, count: int) -> tuple[FloatArray, list[dict]]:
    effects = np.zeros((count, 2))
    typing = np.zeros((RATE, 2))
    sync = []
    mouse = tones.mouse_click()
    for index, event in enumerate(cues["cues"]):
        position = event["frame"] / 60
        sync.append({**event, "audioTime": position, "audioSample": event["frame"] * 800})
        kind = event["kind"]
        pan = math.sin(index * 0.6) * 0.28
        if kind == "click":
            add(effects, mouse, position, 0.73 if position == 43.5 else 0.25, 0)
        elif kind == "key":
            keystroke = tones.keyboard()
            add(effects, keystroke, position, 0.34, pan)
            add(typing, keystroke, position - 31.25, 0.34, pan)
        elif kind == "sweep":
            add(effects, tones.air(0.3), max(0, position - 0.2), 0.26, pan)
        elif kind in ("hit", "cut"):
            add(effects, tones.kick(), position, 0.21)
        elif kind in ("tick", "letter", "logo"):
            add(effects, tones.wood(), position, 0.085 if kind != "letter" else 0.035, pan)
    write_wav(OUTPUT / "clic-final.wav", np.column_stack([mouse, mouse]) * 0.73 / math.sqrt(2))
    write_wav(OUTPUT / "frappe-clavier.wav", typing)
    return effects, sync


def compose() -> None:
    tones = instruments()
    cues = json.loads((OUTPUT / "motion-cues.json").read_text(encoding="utf-8"))
    music = edit_music()
    effects, sync = sound_design(tones, cues, len(music))
    join = round(PRESERVED_FROM * RATE)
    previous_effects = approved_track("bruitages.wav")
    effects[:round(11.7 * RATE)] = previous_effects[:round(11.7 * RATE)]
    effects[join:] = previous_effects[join:]
    mix = music + effects
    previous_mix = approved_track("bande-son-originale.wav")
    mix[join:] = previous_mix[join:]
    gain = min(1, 0.92 / max(float(np.max(np.abs(mix[:join]))), 1e-9))
    mix[:join] *= gain
    music[:join] *= gain
    effects[:join] *= gain
    write_wav(OUTPUT / "musique-mixkit-montage.wav", music)
    write_wav(OUTPUT / "bruitages.wav", effects)
    write_wav(OUTPUT / "bande-son-originale.wav", mix)
    manifest = {"version": ROOT.name, "revision": 5, "duration": DURATION, "bpm": BPM, "sampleRate": RATE, "channels": 2, "originalComposition": False, "musicSource": {"title": "Cat Walk", "artist": "Arulo", "library": "Mixkit", "id": 371, "page": "https://mixkit.co/free-stock-music/edm/", "audioUrl": "https://assets.mixkit.co/music/371/371.mp3", "license": "Mixkit Stock Music Free License", "licenseUrl": "https://mixkit.co/license/#musicFree", "sha256": hashlib.sha256(TRACK.read_bytes()).hexdigest(), "sourceBpm": 130, "editedBpm": BPM, "tempoAdjustedWithoutPitchChange": True}, "v3AudioUsed": False, "synchronizedEvents": len(sync), "continuousMusic": {"start": 0, "end": 33.75, "sourceStartAfterTempoAdjustment": 28, "sourceTimeAdvancesContinuously": True, "noRestartsAt": [11.75, 16.75, 22.25, 27.75], "crossfadeToApprovedEnding": [33.75, 34.5]}, "preservedEnding": {"start": PRESERVED_FROM, "end": DURATION, "source": "history/v4-revision-04.zip", "mixPcmIdentical": True}, "keyboard": {"query": "Wong Kar-wai", "start": 31.25, "keystrokes": 12, "stepFrames": 5}, "finalMouseClick": {"time": 43.5, "frame": 2610, "audioSample": 2088000, "musicDuckingDb": -20, "releaseDelay": 0.058}, "peakDbfs": float(20 * np.log10(np.max(np.abs(mix)))), "rmsDbfs": float(20 * np.log10(np.sqrt(np.mean(mix * mix)))), "stems": ["musique-mixkit-montage.wav", "bruitages.wav", "clic-final.wav", "frappe-clavier.wav"], "workingStemsForVideoProductionOnly": True}
    (OUTPUT / "audio-manifest.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    (OUTPUT / "sync-events.json").write_text(json.dumps({"sampleRate": RATE, "fps": 60, "samplesPerFrame": 800, "events": sync}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest))


if __name__ == "__main__":
    compose()
