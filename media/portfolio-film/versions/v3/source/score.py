from __future__ import annotations

import json
import math
import wave
from pathlib import Path

import numpy as np
from numpy.typing import NDArray


SAMPLE_RATE = 48_000
DURATION = 40.0
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "exports"
RANDOM = np.random.default_rng(2026101810)
FloatArray = NDArray[np.float64]


def timeline(duration: float) -> FloatArray:
    return np.arange(int(duration * SAMPLE_RATE), dtype=np.float64) / SAMPLE_RATE


def frequency(midi: int) -> float:
    return 440.0 * 2.0 ** ((midi - 69) / 12.0)


def add(track: FloatArray, signal: FloatArray, start: float, gain: float, pan: float = 0.0) -> None:
    offset = round(start * SAMPLE_RATE)
    if offset < 0 or offset >= TOTAL_SAMPLES:
        return
    length = min(len(signal), TOTAL_SAMPLES - offset)
    angle = (pan + 1.0) * math.pi / 4.0
    track[offset:offset + length, 0] += signal[:length] * gain * math.cos(angle)
    track[offset:offset + length, 1] += signal[:length] * gain * math.sin(angle)


def kick() -> FloatArray:
    time = timeline(0.42)
    phase = 2.0 * math.pi * (48.0 * time + 78.0 * (1.0 - np.exp(-time * 34.0)) / 34.0)
    body = np.sin(phase) * np.exp(-time * 12.5)
    attack = RANDOM.normal(0, 1, len(time)) * np.exp(-time * 280.0) * 0.1
    return np.tanh((body + attack) * 1.45) * 0.76


def hat(duration: float = 0.09) -> FloatArray:
    time = timeline(duration)
    noise = RANDOM.normal(0.0, 1.0, len(time))
    high = noise - np.convolve(noise, np.ones(7) / 7.0, mode="same")
    return high * np.exp(-time * (42.0 if duration < 0.12 else 16.0))


def bass(midi: int, duration: float = 0.34) -> FloatArray:
    time = timeline(duration)
    pitch = frequency(midi)
    envelope = (1 - np.exp(-time * 500)) * np.exp(-time * 10.5)
    signal = np.sin(2 * math.pi * pitch * time)
    signal += 0.31 * np.sin(4 * math.pi * pitch * time + 0.3)
    signal += 0.13 * np.sin(6 * math.pi * pitch * time)
    return np.tanh(signal * 1.2) * envelope


def pluck(midi: int, duration: float = 1.9) -> FloatArray:
    time = timeline(duration)
    pitch = frequency(midi)
    signal = np.zeros_like(time)
    for partial in range(1, 9):
        amplitude = 1.0 / partial ** 1.65
        decay = 1.5 + partial * 1.1
        detune = np.sqrt(1.0 + 0.00012 * partial * partial)
        signal += np.sin(2 * math.pi * pitch * partial * detune * time) * amplitude * np.exp(-time * decay)
    hammer = RANDOM.normal(0, 1, len(time)) * np.exp(-time * 350) * 0.016
    return (signal + hammer) * (1 - np.exp(-time * 450))

def pad(chord: list[int], duration: float = 2.6) -> FloatArray:
    time = timeline(duration)
    signal = np.zeros_like(time)
    for midi in chord:
        pitch = frequency(midi)
        signal += np.sin(2 * math.pi * pitch * 0.998 * time)
        signal += np.sin(2 * math.pi * pitch * 1.002 * time) * 0.65
        signal += np.sin(4 * math.pi * pitch * time) * 0.12
    envelope = np.minimum(time / 0.23, 1.0) * np.clip((duration - time) / 0.7, 0, 1)
    return signal * envelope / (len(chord) * 1.8)


def sweep(duration: float = 0.4, reverse: bool = False) -> FloatArray:
    time = timeline(duration)
    noise = RANDOM.normal(0, 1, len(time))
    noise = noise - np.convolve(noise, np.ones(11) / 11, mode="same")
    envelope = np.sin(math.pi * time / duration) ** 2
    signal = noise * envelope * (0.25 + 0.75 * time / duration)
    return signal[::-1] if reverse else signal


def soft_click() -> FloatArray:
    time = timeline(0.055)
    signal = np.sin(2 * math.pi * (1800 * time + 2600 * time * time))
    return signal * np.exp(-time * 140) * 0.7


def delay(track: FloatArray, seconds: float, gain: float, swap_channels: bool = False) -> FloatArray:
    offset = int(seconds * SAMPLE_RATE)
    result = np.zeros_like(track)
    result[offset:] = track[:-offset, ::-1] * gain if swap_channels else track[:-offset] * gain
    return result


def write_wav(path: Path, samples: FloatArray) -> FloatArray:
    pcm = (np.clip(samples, -0.999, 0.999) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        output.writeframes(pcm.tobytes())
    return pcm.astype(np.float64) / 32767


def compose() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    rhythm = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float64)
    harmony = np.zeros_like(rhythm)
    melody = np.zeros_like(rhythm)
    effects = np.zeros_like(rhythm)
    chords = [[50, 57, 61, 64, 69], [47, 54, 57, 62, 66], [43, 50, 54, 57, 62], [45, 52, 57, 59, 64]]
    roots = [38, 35, 31, 33]
    melodic_patterns = [[74, 78, 81, 76, 78, 85], [74, 73, 69, 66, 69, 78], [74, 78, 81, 83, 81, 78], [76, 73, 69, 71, 73, 76]]
    kick_signal = kick()
    click_signal = soft_click()
    chord_progression = [0, 0, 1, 1, 2, 2, 3, 3, 0, 1, 2, 3, 0, 1, 2, 3, 2, 3]
    for bar, chord_index in enumerate(chord_progression):
        chord = chords[chord_index]
        position = bar * BAR
        add(harmony, pad(chord, BAR + 0.9), position, 0.22, -0.16)
        if bar >= 8:
            add(harmony, pad([note + 12 for note in chord], BAR + 0.9), position + 0.025, 0.065, 0.45)
        pattern = melodic_patterns[chord_index]
        for index in range(8):
            note_index = [0, 2, 1, 3, 4, 2, 5, 1][(index + bar % 2) % 8]
            note = pattern[note_index]
            gain = (0.09 if index % 2 == 0 else 0.045) * (1.0 if bar < 12 else 1.08)
            add(melody, pluck(note, 1.4), position + index * BEAT / 2, gain, math.sin(index * 1.7 + bar * 0.3) * 0.45)
        for offset, octave, gain in [(0, 0, 0.24), (1.5, 0, 0.14), (2.75, 12, 0.11)]:
            add(rhythm, bass(roots[chord_index] + octave, 0.42), position + offset * BEAT, gain)
    for beat in range(74):
        position = beat * BEAT
        add(rhythm, kick_signal, position, 0.5)
        if beat % 4 in (1, 3):
            add(rhythm, hat(0.1), position, 0.08)
        add(rhythm, hat(0.07), position + BEAT / 2, 0.052, 0.35)
        if position > 5:
            add(rhythm, hat(0.04), position + BEAT * 0.75, 0.027, -0.4)
    visual_manifest = json.loads((OUTPUT / "sources.json").read_text(encoding="utf-8"))
    motion_plan = json.loads((OUTPUT / "motion-cues.json").read_text(encoding="utf-8"))
    if motion_plan["bpm"] != BPM or motion_plan["duration"] != DURATION:
        raise ValueError("Music and motion must use the same tempo and duration")
    cuts = [scene["start"] for scene in visual_manifest["timeline"] if scene["start"] > 0]
    synchronized_events = []
    for index, event in enumerate(motion_plan["cues"]):
        start = event["audioTime"]
        kind = event["kind"]
        synchronized_events.append({**event, "audioSample": round(start * SAMPLE_RATE)})
        pan = math.sin(index * 0.7) * 0.3
        if kind == "cut":
            if start > 0:
                add(effects, sweep(0.2), start - 0.18, 0.055, -0.2)
            add(effects, kick_signal, start, 0.13)
        elif kind == "sweep":
            add(effects, sweep(0.22), start, 0.045, pan)
        elif kind == "letter":
            add(effects, click_signal, start, 0.012, pan)
        elif kind == "logo":
            add(effects, click_signal, start, 0.035, pan)
            add(effects, pluck([74, 78, 81, 86, 81, 78][event["frame"] % 6], 0.9), start, 0.052, pan)
        elif kind in ("click", "tick"):
            add(effects, click_signal, start, 0.06 if kind == "click" else 0.03, pan)
        elif kind in ("tone", "hit"):
            add(effects, pluck(81 if kind == "tone" else 74, 0.85), start, 0.08, pan)
    (OUTPUT / "sync-events.json").write_text(json.dumps({"fps": motion_plan["fps"], "sampleRate": SAMPLE_RATE, "samplesPerFrame": SAMPLE_RATE // motion_plan["fps"], "events": synchronized_events}, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    add(harmony, pad([50, 57, 61, 64, 69], 3.5), 36.5, 0.31)
    for index, note in enumerate([74, 78, 81, 86, 81]):
        add(melody, pluck(note, 2.5), 36.5 + index * 0.5, 0.085 - index * 0.008, -0.3 + index * 0.15)
    harmony += delay(harmony, 0.173, 0.16, True) + delay(harmony, 0.337, 0.09)
    melody += delay(melody, BEAT * 0.75, 0.2, True) + delay(melody, BEAT * 1.5, 0.09)
    times = np.arange(TOTAL_SAMPLES) / SAMPLE_RATE
    phase = np.mod(times, BEAT)
    harmony *= (0.82 + 0.18 * (1 - np.exp(-phase * 20)))[:, None]
    mix = rhythm + harmony + melody + effects
    envelope = np.clip(times / 0.12, 0, 1) * np.clip((DURATION - times) / 0.35, 0, 1)
    mix = np.tanh(mix * 0.95) * envelope[:, None]
    mix *= 0.83 / max(float(np.max(np.abs(mix))), 1e-9)
    mix = write_wav(OUTPUT / "bande-son-originale.wav", mix)
    manifest = {"durationSeconds": DURATION, "sampleRate": SAMPLE_RATE, "channels": 2, "bpm": BPM, "key": "D major", "originalComposition": True, "continuousComposition": True, "copiedPreviousAudio": False, "internalFadesOrRestarts": False, "finalCadenceStartsSeconds": 36.5, "externalSamples": False, "referenceAudioUsed": False, "cutAccentsSeconds": cuts, "synchronizedEvents": len(synchronized_events), "syncSource": "motion-cues.json", "intent": "One continuous forty-second score using the established piano and electronic instruments at 120 BPM. Sustained harmony and shared reverb span every scene, including ten seconds. Final resolution occurs only with the portfolio invitation.", "peakDbfs": float(20 * np.log10(np.max(np.abs(mix)))), "rmsDbfs": float(20 * np.log10(np.sqrt(np.mean(mix * mix))))}
    (OUTPUT / "audio-manifest.json").write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(manifest))


if __name__ == "__main__":
    compose()
