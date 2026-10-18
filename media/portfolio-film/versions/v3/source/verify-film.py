from __future__ import annotations

import hashlib
import json
import subprocess
import wave

import numpy as np
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
PROJECT = ROOT.parent.parent
VIDEO = ROOT / "exports/michel-djoumessi-v11.mp4"


def digest(path: Path) -> str:
    with path.open("rb") as source:
        return hashlib.file_digest(source, "sha256").hexdigest()


def run(arguments: list[str]) -> subprocess.CompletedProcess[str]:
    result = subprocess.run(arguments, capture_output=True, text=True)
    if result.returncode != 0:
        raise RuntimeError(result.stderr)
    return result


def decoded_tail_hashes(path: Path, start: float) -> list[str]:
    output = run(["ffmpeg", "-hide_banner", "-v", "error", "-ss", str(start), "-i", str(path), "-map", "0:v:0", "-an", "-f", "framemd5", "-"]).stdout
    return [row.rsplit(",", 1)[-1].strip() for row in output.splitlines() if row and not row.startswith("#")]


def verify() -> None:
    metadata = json.loads(run(["ffprobe", "-v", "error", "-show_streams", "-show_format", "-of", "json", str(VIDEO)]).stdout)
    video = next(stream for stream in metadata["streams"] if stream["codec_type"] == "video")
    audio = next(stream for stream in metadata["streams"] if stream["codec_type"] == "audio")
    assert video["width"] == 1920 and video["height"] == 1080
    assert video["r_frame_rate"] == "60/1"
    assert int(video["nb_frames"]) == 2400
    assert video["codec_name"] == "h264" and video["pix_fmt"] == "yuv420p"
    assert video["color_space"] == "bt709" and video["color_range"] == "tv"
    assert abs(float(metadata["format"]["duration"]) - 40.0) < 0.03
    assert audio["codec_name"] == "aac" and audio["channels"] == 2
    assert audio["sample_rate"] == "48000"
    run(["ffmpeg", "-hide_banner", "-v", "error", "-xerror", "-i", str(VIDEO), "-f", "null", "-"])
    measured = run(["ffmpeg", "-hide_banner", "-i", str(VIDEO), "-vn", "-af", "loudnorm=I=-16:TP=-1.5:LRA=9:print_format=json", "-f", "null", "-"])
    loudness = json.JSONDecoder().raw_decode(measured.stderr[measured.stderr.rfind("{"):])[0]
    assert float(loudness["input_tp"]) < -1.0
    with wave.open(str(ROOT / "exports/bande-son-originale.wav"), "rb") as score:
        assert score.getnframes() == 1_920_000 and score.getnchannels() == 2
        samples = np.frombuffer(score.readframes(score.getnframes()), dtype="<i2").reshape(-1, 2).astype(np.float64) / 32768
    blocks = samples[9_600:1_896_000].reshape(-1, 4_800, 2)
    interior_rms_dbfs = 20 * np.log10(np.sqrt(np.mean(blocks ** 2, axis=(1, 2))) + 1e-12)
    assert float(np.min(interior_rms_dbfs)) > -45
    audio_manifest = json.loads((ROOT / "exports/audio-manifest.json").read_text(encoding="utf-8"))
    assert audio_manifest["continuousComposition"] is True
    assert audio_manifest["copiedPreviousAudio"] is False
    assert audio_manifest["internalFadesOrRestarts"] is False
    previous_v10_path = PROJECT / "media/portfolio-film-v10/exports/michel-djoumessi-v10.mp4"
    assert digest(previous_v10_path) == "4d7a6102ab082eb072a266cb840adf13686c159e712cfaf0431bf964b036a4f2"
    new_frames = decoded_tail_hashes(VIDEO, 250 / 60)
    old_frames = decoded_tail_hashes(previous_v10_path, 250 / 60)
    assert len(new_frames) == len(old_frames) == 2150
    assert new_frames == old_frames
    sources = json.loads((ROOT / "exports/sources.json").read_text(encoding="utf-8"))
    assert sources["projectAssetsUsed"] is False
    previous_sources = json.loads((PROJECT / "media/portfolio-film-v10/exports/sources.json").read_text(encoding="utf-8"))
    assert sources["timeline"] == previous_sources["timeline"]
    assert sources["timeline"][0]["start"] == 0 and sources["timeline"][-1]["end"] == 40
    for previous, current in zip(sources["timeline"], sources["timeline"][1:]):
        assert previous["end"] == current["start"]
    for asset in sources["assets"]:
        assert digest(PROJECT / asset["source"]) == asset["sha256"]
    original_v2 = json.loads((PROJECT / "media/portfolio-film/versions/v2/exports/sources.json").read_text(encoding="utf-8"))
    assert sources["identity"]["palette"] == original_v2["identity"]["palette"]
    assert set(sources["identity"]["fonts"]) == set(original_v2["identity"]["fonts"])
    motion = json.loads((ROOT / "exports/motion-cues.json").read_text(encoding="utf-8"))
    previous_motion = json.loads((PROJECT / "media/portfolio-film-v10/exports/motion-cues.json").read_text(encoding="utf-8"))
    assert motion["cues"] == previous_motion["cues"]
    sync = json.loads((ROOT / "exports/sync-events.json").read_text(encoding="utf-8"))
    assert len(sync["events"]) == len(motion["cues"])
    for planned, rendered in zip(motion["cues"], sync["events"]):
        assert planned["frame"] == rendered["frame"]
        assert rendered["audioSample"] == rendered["frame"] * 800
        assert abs(planned["time"] - rendered["audioTime"]) <= 1 / 60
    approved = [
        ("v1", PROJECT / "media/portfolio-film/exports/michel-djoumessi-showreel.mp4", "40a629eb998d8c95e2efeb860d9d8f3cda941952c51013fb044acb8a2c97e520"),
        ("v2", PROJECT / "media/portfolio-film-v2/exports/michel-djoumessi-v2-motion.mp4", "18c23e216395700bf810a3e04b836a20ced19f82653675cbfcd1286cecbfabbb"),
    ]
    previous_v7 = digest(PROJECT / "media/portfolio-film-v7/exports/michel-djoumessi-v7.mp4")
    assert previous_v7 == "b8b51dd074dcefcbe8f5c01bc74f73824e991d47cd85fb080c66dbdfdef3b47a"
    preservation = []
    for version, path, expected in approved:
        actual = digest(path)
        assert actual == expected
        preservation.append({"version": version, "sha256": actual, "unchanged": True})
    report = {
        "synchronizedEventsVerified": len(sync["events"]),
        "syncToleranceFrames": 1,
        "preservedTailFromSeconds": 250 / 60,
        "previousTailFromSeconds": 250 / 60,
        "continuousFortySecondComposition": True,
        "internalAudioRestart": False,
        "quietestInterior100msDbfs": float(np.min(interior_rms_dbfs)),
        "identicalDecodedTailFrames": len(new_frames),
        "previousV10Unchanged": True,
        "timelineUnchanged": True,
        "animationCueTimesUnchanged": True,
        "paletteAndFontsMatchV2": True,
        "file": VIDEO.name,
        "sha256": digest(VIDEO),
        "bytes": VIDEO.stat().st_size,
        "durationSeconds": float(metadata["format"]["duration"]),
        "width": video["width"],
        "height": video["height"],
        "fps": 60,
        "frames": int(video["nb_frames"]),
        "videoCodec": video["codec_name"],
        "pixelFormat": video["pix_fmt"],
        "colorSpace": video["color_space"],
        "audioCodec": audio["codec_name"],
        "audioChannels": audio["channels"],
        "audioSampleRate": int(audio["sample_rate"]),
        "decodeErrors": 0,
        "loudness": loudness,
        "sourceHashesVerified": len(sources["assets"]),
        "projectScreensUsed": False,
        "referenceAudioUsed": False,
        "approvedVersions": preservation,
        "previousV7Unchanged": True,
    }
    (ROOT / "exports/verification-technique.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    verify()
