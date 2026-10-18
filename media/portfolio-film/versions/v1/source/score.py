from __future__ import annotations

import json
import math
import wave
from pathlib import Path

import numpy as np
from numpy.typing import NDArray


SAMPLE_RATE = 48_000
DURATION = 32.0
BEAT = 0.5
TOTAL_SAMPLES = int(SAMPLE_RATE * DURATION)
ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "exports"
RANDOM = np.random.default_rng(20261018)
FloatArray = NDArray[np.float64]


def timeline(duration: float) -> FloatArray:
    return np.arange(int(duration * SAMPLE_RATE), dtype=np.float64) / SAMPLE_RATE


def frequency(midi: int) -> float:
    return 440.0 * 2.0 ** ((midi - 69) / 12.0)


def add(track: FloatArray, signal: FloatArray, start: float, gain: float, pan: float = 0.0) -> None:
    offset = int(start * SAMPLE_RATE)
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


def clap() -> FloatArray:
    time = timeline(0.18)
    noise = RANDOM.normal(0, 1, len(time))
    noise = noise - np.convolve(noise, np.ones(12) / 12, mode="same")
    envelope = np.zeros_like(time)
    for delay in (0.0, 0.012, 0.024):
        shifted = np.maximum(0, time - delay)
        envelope += (time >= delay) * np.exp(-shifted * 65)
    return noise * envelope * 0.34


def bass(midi: int, duration: float = 0.34) -> FloatArray:
    time = timeline(duration)
    pitch = frequency(midi)
    envelope = (1 - np.exp(-time * 500)) * np.exp(-time * 10.5)
    signal = np.sin(2 * math.pi * pitch * time)
    signal += 0.31 * np.sin(4 * math.pi * pitch * time + 0.3)
    signal += 0.13 * np.sin(6 * math.pi * pitch * time)
    return np.tanh(signal * 1.2) * envelope


def pluck(midi: int, duration: float = 0.6) -> FloatArray:
    time = timeline(duration)
    pitch = frequency(midi)
    modulator = np.sin(2 * math.pi * pitch * 2 * time) * np.exp(-time * 8) * 1.25
    signal = np.sin(2 * math.pi * pitch * time + modulator)
    signal += np.sin(2 * math.pi * pitch * 1.003 * time) * 0.23
    return signal * (1 - np.exp(-time * 700)) * np.exp(-time * 6.5)


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


def write_wav(path: Path, samples: FloatArray) -> None:
    pcm = (np.clip(samples, -0.999, 0.999) * 32767).astype("<i2")
    with wave.open(str(path), "wb") as output:
        output.setnchannels(2)
        output.setsampwidth(2)
        output.setframerate(SAMPLE_RATE)
        output.writeframes(pcm.tobytes())


def compose() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    rhythm = np.zeros((TOTAL_SAMPLES, 2), dtype=np.float64)
    harmony = np.zeros_like(rhythm)
    melody = np.zeros_like(rhythm)
    effects = np.zeros_like(rhythm)
    chords = [[50, 53, 57, 60], [46, 50, 53, 57], [53, 57, 60, 64], [48, 52, 55, 58]]
    root_notes = [38, 34, 41, 36]
    kick_signal = kick()
    clap_signal = clap()
    click_signal = soft_click()

    for bar in range(16):
        chord = chords[(bar // 2) % 4]
        add(harmony, pad(chord), bar * 2, 0.27 if bar not in (6, 15) else 0.36, -0.12)
        add(harmony, pad([note + 12 for note in chord], 2.8), bar * 2 + 0.035, 0.1, 0.35)

    for beat in range(4, 61):
        position = beat * BEAT
        in_break = 25.5 <= position < 26.5
        is_ending = position >= 30
        if in_break or (is_ending and beat != 60):
            continue
        add(rhythm, kick_signal, position, 0.76)
        if beat % 4 in (1, 3) and position < 30:
            add(rhythm, clap_signal, position, 0.24)
        if position < 30:
            add(rhythm, hat(), position + 0.25, 0.12, 0.25)
            add(rhythm, hat(0.14), position + 0.375, 0.045, -0.4)

    for bar in range(1, 15):
        if bar == 13:
            continue
        root_note = root_notes[(bar // 2) % 4]
        for offset, octave, strength in ((0.0, 0, 0.37), (0.75, 0, 0.29), (1.0, 12, 0.2), (1.5, 0, 0.32), (1.75, 7, 0.19)):
            add(rhythm, bass(root_note + octave), bar * 2 + offset, strength)
        if bar >= 11:
            for offset in (0.125, 0.625, 1.125, 1.625):
                add(rhythm, hat(0.05), bar * 2 + offset, 0.035, -0.5)

    arpeggio = [0, 2, 1, 3, 2, 1, 3, 0]
    for bar in range(2, 15):
        chord = chords[(bar // 2) % 4]
        for index, chord_index in enumerate(arpeggio):
            if bar == 13 and index < 2:
                continue
            midi = chord[chord_index] + 12
            strength = 0.1 if index % 2 == 0 else 0.065
            add(melody, pluck(midi), bar * 2 + index * 0.25, strength, math.sin(index * 1.8) * 0.55)

    for start in (2.3, 5.65, 7.95, 12.65, 16.65, 20.65, 25.15, 28.15):
        add(effects, sweep(0.33), start, 0.11, -0.2)
        add(effects, sweep(0.25, True), start + 0.1, 0.055, 0.35)

    for start in (0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 1.0, 1.2, 3.2, 3.5, 4.1, 4.3, 4.5, 7.8, 8.5, 10.15, 10.22, 10.29, 10.36, 10.43, 10.5, 10.57, 10.64, 10.71, 10.78, 10.85, 13.8, 14.05, 14.3, 14.55, 15.3, 17.8, 18.0, 18.2, 18.4, 21.8, 22.7, 23.3, 23.9, 26.25, 26.95, 27.65, 29.3, 30.55):
        add(effects, click_signal, start, 0.1, math.sin(start) * 0.35)

    for start in (3, 6, 8.5, 13, 17, 21, 25.5, 28.5):
        time = timeline(0.6)
        impact = np.sin(2 * math.pi * (43 * time + 20 * (1 - np.exp(-time * 14)) / 14)) * np.exp(-time * 10)
        add(effects, impact, start, 0.24)

    harmony += delay(harmony, 0.173, 0.21, True) + delay(harmony, 0.337, 0.12)
    melody += delay(melody, 0.375, 0.31, True) + delay(melody, 0.75, 0.13)
    sample_times = np.arange(TOTAL_SAMPLES) / SAMPLE_RATE
    pulse = np.mod(sample_times, BEAT)
    duck = 0.68 + 0.32 * (1 - np.exp(-pulse * 16))
    harmony *= duck[:, None]
    melody *= (0.82 + 0.18 * (1 - np.exp(-pulse * 25)))[:, None]
    mix = rhythm + harmony + melody + effects
    fade_in = np.clip(sample_times / 0.08, 0, 1)
    fade_out = np.clip((DURATION - sample_times) / 0.8, 0, 1)
    envelope = (fade_in * fade_out)[:, None]
    mix = np.tanh(mix * 1.05) * envelope
    peak = float(np.max(np.abs(mix)))
    mix *= 0.84 / max(peak, 1e-9)
    write_wav(OUTPUT / "bande-son-originale.wav", mix)
    measurements = {
        "durationSeconds": DURATION,
        "sampleRate": SAMPLE_RATE,
        "channels": 2,
        "bpm": 120,
        "key": "D minor",
        "peakDbfs": float(20 * np.log10(np.max(np.abs(mix)))),
        "rmsDbfs": float(20 * np.log10(np.sqrt(np.mean(mix * mix)))),
        "originalComposition": True,
        "externalSamples": False,
    }
    (OUTPUT / "audio-manifest.json").write_text(json.dumps(measurements, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(measurements))


if __name__ == "__main__":
    compose()
