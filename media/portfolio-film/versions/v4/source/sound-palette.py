from __future__ import annotations

import math

import numpy as np
from numpy.typing import NDArray


RATE = 48_000
FloatArray = NDArray[np.float64]
RANDOM = np.random.default_rng(20261021)


def frequency(note: int) -> float:
    return 440 * 2 ** ((note - 69) / 12)


def clock(duration: float) -> FloatArray:
    return np.arange(round(duration * RATE), dtype=np.float64) / RATE


def noise(duration: float, low: float, high: float) -> FloatArray:
    count = round(duration * RATE)
    spectrum = np.fft.rfft(RANDOM.normal(size=count))
    frequencies = np.fft.rfftfreq(count, 1 / RATE)
    spectrum *= np.clip((frequencies - low) / 450, 0, 1) * np.clip((high - frequencies) / 1200, 0, 1)
    signal = np.fft.irfft(spectrum, n=count)
    return signal / max(float(np.sqrt(np.mean(signal * signal))), 1e-9)


def guitar(note: int, duration: float = 2.5) -> FloatArray:
    period = round(RATE / frequency(note))
    count = round(duration * RATE)
    signal = np.zeros(count + period)
    excitation = RANDOM.normal(size=period)
    excitation -= excitation.mean()
    excitation = (excitation + np.roll(excitation, 1) + np.roll(excitation, 2)) / 3
    excitation /= max(float(np.max(np.abs(excitation))), 1e-9)
    signal[:period] = excitation
    for start in range(period, count, period):
        length = min(period, count - start)
        previous = signal[start - period:start - period + length]
        neighbor = signal[start - period + 1:start - period + length + 1]
        signal[start:start + length] = (previous * 0.57 + neighbor * 0.43) * 0.994
    t = clock(duration)
    body = np.sin(2 * math.pi * frequency(note) * t) * np.exp(-t * 2.2) * 0.13
    return (signal[:count] + body) * np.minimum(t / 0.003, 1) * np.minimum((duration - t) / 0.08, 1)


def velvet(note: int, duration: float) -> FloatArray:
    t = clock(duration)
    phase = 2 * math.pi * frequency(note) * t
    voice = np.zeros_like(t)
    for harmonic, strength in [(1, 1), (2, 0.29), (3, 0.12), (4, 0.035)]:
        for detune in [-0.0018, 0.0018]:
            voice += np.sin(phase * harmonic * (1 + detune) + harmonic * 0.25) * strength / 2
    envelope = np.minimum(t / 0.13, 1) * np.exp(-t * 0.52) * np.minimum((duration - t) / 0.42, 1)
    return voice * envelope * 0.4


def bass(note: int, duration: float) -> FloatArray:
    t = clock(duration)
    phase = 2 * math.pi * frequency(note) * t
    voice = np.sin(phase + 0.35 * np.sin(phase) * np.exp(-t * 9)) + 0.16 * np.sin(phase * 2)
    envelope = np.minimum(t / 0.008, 1) * np.exp(-t * 2.8) * np.minimum((duration - t) / 0.07, 1)
    return np.tanh(voice * 1.4) * envelope


def kick() -> FloatArray:
    t = clock(0.38)
    phase = 2 * math.pi * (47 * t + 95 / 42 * (1 - np.exp(-t * 42)))
    body = np.sin(phase) * np.exp(-t * 12)
    transient = noise(0.38, 700, 4200) * np.exp(-t * 340) * 0.13
    return np.tanh((body + transient) * 1.25) * np.minimum(t / 0.001, 1)


def snare() -> FloatArray:
    t = clock(0.23)
    rattle = noise(0.23, 850, 11500) * (np.exp(-t * 29) + 0.27 * np.exp(-np.maximum(0, t - 0.014) * 50))
    body = (np.sin(2 * math.pi * 178 * t) + 0.35 * np.sin(2 * math.pi * 320 * t)) * np.exp(-t * 35)
    return (rattle * 0.29 + body * 0.27) * np.minimum(t / 0.001, 1)


def shaker(duration: float = 0.08) -> FloatArray:
    t = clock(duration)
    return noise(duration, 4800, 16000) * np.exp(-t * (60 if duration < 0.1 else 20)) * np.minimum(t / 0.002, 1) * 0.28


def wood() -> FloatArray:
    t = clock(0.09)
    return (np.sin(2 * math.pi * 810 * t) * 0.6 + np.sin(2 * math.pi * 1320 * t) * 0.3) * np.exp(-t * 80)


def mouse_click() -> FloatArray:
    t = clock(0.14)
    result = np.zeros_like(t)
    for start, strength in [(0, 1), (0.058, 0.65)]:
        local = np.maximum(0, t - start)
        active = t >= start
        mechanics = noise(0.14, 1700, 14500) * np.exp(-local * 640)
        shell = (np.sin(2 * math.pi * 2450 * local) + 0.45 * np.sin(2 * math.pi * 4100 * local)) * np.exp(-local * 390)
        result += (mechanics * 0.6 + shell * 0.4) * active * strength * np.minimum(local / 0.0002, 1)
    return result / max(float(np.max(np.abs(result))), 1e-9)


def air(duration: float = 0.32) -> FloatArray:
    t = clock(duration)
    return noise(duration, 600, 10500) * np.sin(math.pi * t / duration) ** 3 * 0.22


def keyboard() -> FloatArray:
    t = clock(0.075)
    pitch = float(RANDOM.uniform(1650, 2400))
    attack = noise(0.075, 1400, 12500) * np.exp(-t * 280)
    keycap = (np.sin(2 * math.pi * pitch * t) * 0.3 + np.sin(2 * math.pi * 320 * t) * 0.4) * np.exp(-t * 130)
    return (attack * 0.55 + keycap) * np.minimum(t / 0.0004, 1)
