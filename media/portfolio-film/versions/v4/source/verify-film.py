from __future__ import annotations

import hashlib
import io
import json
import re
import subprocess
import wave
import zipfile
from pathlib import Path

import numpy as np


ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "exports"
FILM = OUTPUT / f"michel-djoumessi-{ROOT.name}.mp4"
ORIGINAL = ROOT.parent / "v3" / "exports" / "michel-djoumessi-v3-final.mp4"
ORIGINAL_HASH = "35db1e06b74bee8d79d7acd236129633ab067bfefcee56c46d3688644ecabcf2"
V4BIS_HASH = "2f19f4c7c765cc817d67ea398ecee4930b82d76d077f859f82254ecd6871fa51"
INITIAL_V4_HASH = "b348880d4686f2d8fd90f273661f67e1b138700d803d5906ed9af52ad977d490"
REVISION_02_HASH = "9a944d7e72ed72d9b981a2b87fb470461505ff3f7d1039cc4c4be923ebb05234"
REVISION_03_HASH = "8558b14af988c0f11097ead02b5a5882f1efc5eab2a4f8bf482eee8893e8739a"
REVISION_04_HASH = "dfd5bd83714d3acfdcbbbb972367ac483eed8da586db7668dffec0f7bc9b7e78"


def command(arguments: list[str]) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(arguments, capture_output=True, text=True, encoding="utf-8", errors="replace", check=False)
    if result.returncode != 0:
        raise RuntimeError(result.stderr[-4000:])
    return result


def pcm(filename: Path) -> np.ndarray:
    with wave.open(str(filename), "rb") as source:
        if source.getframerate() != 48000 or source.getnchannels() != 2:
            raise ValueError("Format sonore inattendu")
        return np.frombuffer(source.readframes(source.getnframes()), dtype="<i2").reshape(-1, 2)


def similarity(new_start: float, old_start: float, duration: float) -> float:
    result = command(["ffmpeg", "-hide_banner", "-ss", str(new_start), "-i", str(FILM), "-ss", str(old_start), "-i", str(ORIGINAL), "-filter_complex", "[0:v]setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]ssim", "-t", str(duration), "-an", "-f", "null", "-"])
    matches = re.findall(r"All:([0-9.]+)", result.stderr)
    if not matches:
        raise ValueError("La comparaison du master n’a pas produit de mesure")
    value = float(matches[-1])
    assert value > 0.995, f"La reprise du master diffère trop : SSIM {value}"
    return value


def high_pass(signal: np.ndarray) -> np.ndarray:
    spectrum = np.fft.rfft(signal)
    spectrum[np.fft.rfftfreq(len(signal), 1 / 48000) < 1700] = 0
    return np.fft.irfft(spectrum, n=len(signal))


def verify_final_click() -> dict:
    result = subprocess.run(["ffmpeg", "-v", "error", "-ss", "43.45", "-i", str(FILM), "-t", "0.3", "-vn", "-ar", "48000", "-ac", "2", "-f", "f32le", "pipe:1"], capture_output=True, check=True)
    decoded = np.frombuffer(result.stdout, dtype="<f4").reshape(-1, 2).mean(axis=1)
    template = np.zeros(len(decoded))
    click = pcm(OUTPUT / "clic-final.wav").mean(axis=1) / 32767
    template[2400:2400 + len(click)] = click
    decoded = high_pass(decoded)
    template = high_pass(template)
    correlations = [(lag, float(np.dot(decoded, np.roll(template, lag)) / max(np.linalg.norm(decoded) * np.linalg.norm(template), 1e-9))) for lag in range(-96, 97)]
    lag, correlation = max(correlations, key=lambda pair: pair[1])
    assert correlation > 0.35, f"Clic final insuffisamment distinct dans l’AAC : {correlation}"
    assert abs(lag) < 96, f"Clic final décalé : {lag} échantillons"
    return {"time": 43.5, "frame": 2610, "aacTemplateCorrelation": correlation, "lagSamples": lag, "lagMilliseconds": lag / 48, "decodedPeakDbfs": float(20 * np.log10(np.max(np.abs(decoded))))}


def approved_pcm(name: str) -> np.ndarray:
    with zipfile.ZipFile(ROOT / "history" / "v4-revision-04.zip") as archive:
        entry = next(entry for entry in archive.namelist() if entry.endswith("exports/" + name))
        with wave.open(io.BytesIO(archive.read(entry)), "rb") as audio:
            return np.frombuffer(audio.readframes(audio.getnframes()), dtype="<i2").reshape(-1, 2)


def verify_continuity(music: np.ndarray) -> list[dict]:
    filename = ROOT / ".work" / "continuity-source.wav"
    filename.parent.mkdir(exist_ok=True)
    command(["ffmpeg", "-v", "error", "-y", "-i", str(ROOT / "assets" / "cat-walk-arulo-mixkit-371.mp3"), "-af", "atempo=0.9230769231", "-ar", "48000", "-ac", "2", "-c:a", "pcm_s16le", str(filename)])
    source = pcm(filename)
    checks = []
    for boundary in [11.75, 16.75, 22.25, 27.75, 29]:
        start = round((boundary - 0.25) * 48000)
        end = start + 24000
        actual = music[start:end, 0].astype(np.float64)
        expected = source[start + 28 * 48000:end + 28 * 48000, 0].astype(np.float64)
        correlation = float(np.corrcoef(actual, expected)[0, 1])
        assert correlation > 0.9999, f"Rupture musicale près de {boundary}s : {correlation}"
        checks.append({"time": boundary, "continuousSourceCorrelation": correlation})
    return checks


def verify_typing() -> dict:
    result = subprocess.run(["ffmpeg", "-v", "error", "-ss", "31.25", "-i", str(FILM), "-t", "1", "-vn", "-ar", "48000", "-ac", "2", "-f", "f32le", "pipe:1"], capture_output=True, check=True)
    decoded = high_pass(np.frombuffer(result.stdout, dtype="<f4").reshape(-1, 2).mean(axis=1))
    template = high_pass(pcm(OUTPUT / "frappe-clavier.wav").mean(axis=1) / 32767)
    correlation = float(np.dot(decoded, template) / (np.linalg.norm(decoded) * np.linalg.norm(template)))
    assert correlation > 0.1, f"La frappe n’est pas suffisamment distincte : {correlation}"
    return {"query": "Wong Kar-wai", "start": 31.25, "keystrokes": 12, "aacTemplateCorrelation": correlation}


def verify() -> None:
    probe = json.loads(command(["ffprobe", "-v", "error", "-count_frames", "-show_streams", "-show_format", "-of", "json", str(FILM)]).stdout)
    video = next(stream for stream in probe["streams"] if stream["codec_type"] == "video")
    audio = next(stream for stream in probe["streams"] if stream["codec_type"] == "audio")
    assert (video["width"], video["height"]) == (1920, 1080)
    assert video["avg_frame_rate"] == "60/1"
    assert int(video["nb_read_frames"]) == 2700
    assert abs(float(video["duration"]) - 45) < 0.001
    assert abs(float(audio["duration"]) - 45) < 0.03
    assert audio["channels"] == 2 and audio["sample_rate"] == "48000"
    assert video["codec_name"] == "h264" and audio["codec_name"] == "aac"
    decode = command(["ffmpeg", "-v", "error", "-i", str(FILM), "-f", "null", "-"])
    if decode.stderr.strip():
        raise ValueError(decode.stderr)
    original_hash = hashlib.sha256(ORIGINAL.read_bytes()).hexdigest()
    assert original_hash == ORIGINAL_HASH
    v4bis_hash = hashlib.sha256((ROOT.parent / "v4bis" / "exports" / "michel-djoumessi-v4bis.mp4").read_bytes()).hexdigest()
    assert v4bis_hash == V4BIS_HASH
    with zipfile.ZipFile(ROOT / "history" / "v4-initiale.zip") as backup:
        entry = next(name for name in backup.namelist() if name.endswith("michel-djoumessi-v4.mp4"))
        assert hashlib.sha256(backup.read(entry)).hexdigest() == INITIAL_V4_HASH
    with zipfile.ZipFile(ROOT / "history" / "v4-revision-02.zip") as backup:
        entry = next(name for name in backup.namelist() if name.endswith("michel-djoumessi-v4.mp4"))
        assert hashlib.sha256(backup.read(entry)).hexdigest() == REVISION_02_HASH
    with zipfile.ZipFile(ROOT / "history" / "v4-revision-03.zip") as backup:
        entry = next(name for name in backup.namelist() if name.endswith("michel-djoumessi-v4.mp4"))
        assert hashlib.sha256(backup.read(entry)).hexdigest() == REVISION_03_HASH
    with zipfile.ZipFile(ROOT / "history" / "v4-revision-04.zip") as backup:
        entry = next(name for name in backup.namelist() if name.endswith("michel-djoumessi-v4.mp4"))
        assert hashlib.sha256(backup.read(entry)).hexdigest() == REVISION_04_HASH
    score = pcm(OUTPUT / "bande-son-originale.wav")
    old_score = pcm(ORIGINAL.parent / "bande-son-originale.wav")
    assert len(score) == 45 * 48000
    music = pcm(OUTPUT / "musique-mixkit-montage.wav")
    effects = pcm(OUTPUT / "bruitages.wav")
    assert np.max(np.abs(score.astype(np.int32) - music.astype(np.int32) - effects.astype(np.int32))) <= 1
    correlation = float(np.corrcoef(music[:len(old_score), 0], old_score[:, 0])[0, 1])
    assert abs(correlation) < 0.1
    assert not np.array_equal(score[1656000:], old_score[1416000:])
    approved = approved_pcm("bande-son-originale.wav")
    assert np.array_equal(score[1656000:], approved[1656000:])
    approved_music = approved_pcm("musique-mixkit-montage.wav")
    assert np.array_equal(music[:round(11.7 * 48000)], approved_music[:round(11.7 * 48000)])
    continuity = verify_continuity(music)
    typing_report = verify_typing()
    click_report = verify_final_click()
    motion = json.loads((OUTPUT / "motion-cues.json").read_text(encoding="utf-8"))
    sound = json.loads((OUTPUT / "sync-events.json").read_text(encoding="utf-8"))
    assert len(motion["cues"]) == len(sound["events"])
    assert all(event["audioSample"] == event["frame"] * 800 for event in sound["events"])
    assert all(event["frame"] < 2700 for event in sound["events"])
    keys = [event for event in sound["events"] if event["kind"] == "key"]
    assert ''.join(event["label"] for event in keys) == 'Wong Kar-wai'
    assert [event["frame"] for event in keys] == list(range(1875, 1931, 5))
    final_click = next(event for event in sound["events"] if event["frame"] == 2610)
    assert final_click["kind"] == "click" and final_click["audioSample"] == 2088000
    windows = score.astype(np.float64).reshape(-1, 12000, 2) / 32767
    rms = np.sqrt(np.mean(windows * windows, axis=(1, 2)))
    assert float(np.min(rms[1:-2])) > 0.003
    opening_ssim = similarity(0, 0, 4)
    ending_ssim = similarity(34.5, 29.5, 7)
    sources = json.loads((OUTPUT / "sources.json").read_text(encoding="utf-8"))
    assert sources["opening"]["duration"] == 4
    assert sources["ending"]["originalStart"] == 29.5
    assert sources["removedLogoReconstruction"] is True
    assert sources["pointer"] == "mouse"
    assert sources["addedTools"] == ['PHP', 'C++']
    assert sources["onlyProject"]["name"] == 'Zen'
    assert sources["onlyProject"]["start"] == 30 and sources["onlyProject"]["end"] == 33.5
    assert sources["finalScreen"]["title"] == 'ET SI ON TRAVAILLAIT ENSEMBLE ?'
    audio_manifest = json.loads((OUTPUT / "audio-manifest.json").read_text(encoding="utf-8"))
    assert audio_manifest["originalComposition"] is False
    music_source = audio_manifest["musicSource"]
    track_hash = hashlib.sha256((ROOT / "assets" / "cat-walk-arulo-mixkit-371.mp3").read_bytes()).hexdigest()
    assert track_hash == music_source["sha256"]
    assert audio_manifest["continuousMusic"]["noRestartsAt"] == [11.75, 16.75, 22.25, 27.75]
    report = {"version": ROOT.name, "revision": 5, "duration": 45, "resolution": [1920, 1080], "fps": 60, "frames": 2700, "audio": {"channels": 2, "sampleRate": 48000, "codec": "aac", "replacementMusic": music_source, "continuityChecks": continuity, "approvedFirstSecondsPcmIdentical": 11.7, "approvedEndingPcmIdenticalFrom": 34.5, "musicAndEffectsSumVerified": True, "typing": typing_report, "finalMouseClick": click_report, "minimumQuarterSecondRmsDbfs": float(20 * np.log10(np.min(rms[1:-2]))), "synchronizedEvents": len(sound["events"]), "samplesPerFrame": 800}, "fullDecode": "passed", "v3Unchanged": original_hash, "v4bisUnchanged": v4bis_hash, "previousBackupsVerified": 4, "v3Opening": {"start": 0, "duration": 4, "ssim": opening_ssim, "originalAnimation": True}, "preservedPictureTail": {"oldStart": 29.5, "newStart": 34.5, "duration": 7, "ssim": ending_ssim, "reencoded": True}, "removedSequence": "Reconstruction du logo", "onlyProject": sources["onlyProject"], "addedTools": sources["addedTools"], "finalScreen": sources["finalScreen"], "bytes": FILM.stat().st_size, "sha256": hashlib.sha256(FILM.read_bytes()).hexdigest()}
    (OUTPUT / "verification-technique.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report))


if __name__ == "__main__":
    verify()
