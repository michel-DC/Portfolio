"use client";

import React, { useState, useEffect, useRef, KeyboardEvent } from "react";
import { Section } from "./ui/section";

const BOARD_SIZE = 30; // Augmenter la taille de la grille
const INITIAL_SNAKE = [
  { x: 8, y: 10 },
  { x: 9, y: 10 },
  { x: 10, y: 10 },
];
const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

export const SnakeGame = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(DIRECTIONS.ArrowRight);
  const [food, setFood] = useState(getRandomPosition);
  const [isRunning, setIsRunning] = useState(false);
  const [score, setScore] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (DIRECTIONS[e.key as keyof typeof DIRECTIONS]) {
        setDirection(DIRECTIONS[e.key as keyof typeof DIRECTIONS]);
      } else if (e.key === " ") {
        setIsRunning((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown as any);
    return () => window.removeEventListener("keydown", handleKeyDown as any);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setSnake((prev) => moveSnake(prev));
    }, 150);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [direction, isRunning]);

  const moveSnake = (prevSnake: typeof snake) => {
    const newHead = {
      x:
        (prevSnake[prevSnake.length - 1].x + direction.x + BOARD_SIZE) %
        BOARD_SIZE,
      y:
        (prevSnake[prevSnake.length - 1].y + direction.y + BOARD_SIZE) %
        BOARD_SIZE,
    };

    if (
      prevSnake.some(
        (segment) => segment.x === newHead.x && segment.y === newHead.y
      )
    ) {
      setIsRunning(false);
      return prevSnake;
    }

    const newSnake = [...prevSnake, newHead];

    if (newHead.x === food.x && newHead.y === food.y) {
      setFood(getRandomPosition());
      setScore((prev) => prev + 1);
      return newSnake;
    }

    return newSnake.slice(1);
  };

  const handleRestart = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(DIRECTIONS.ArrowRight);
    setFood(getRandomPosition());
    setIsRunning(true);
    setScore(0);
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  return (
    <Section>
      <h2 className="scroll-m-20 mb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-caption">
        Hey, already finished?
      </h2>
      <p className="mb-12">
        Before leaving, get some rest and play this chill game.
      </p>
      <div className="flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-bold mb-4">Snake Game</h1>
        <div className="mb-2 text-lg">Score: {score}</div>
        <div
          className="grid border-4 border-gray-700"
          style={{
            gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(15px, 1fr))`,
            gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(15px, 1fr))`,
          }}
        >
          {[...Array(BOARD_SIZE * BOARD_SIZE)].map((_, i) => {
            const x = i % BOARD_SIZE;
            const y = Math.floor(i / BOARD_SIZE);
            const isSnake = snake.some(
              (segment) => segment.x === x && segment.y === y
            );
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={i}
                className={`w-full h-full border border-gray-800 ${
                  isSnake
                    ? "bg-green-500"
                    : isFood
                    ? "bg-red-500"
                    : "bg-gray-800"
                }`}
              ></div>
            );
          })}
        </div>
        <div className="space-x-4 mt-4">
          {!isRunning && (
            <button
              onClick={handleStart}
              className="px-4 py-2 w-24 bg-green-600 rounded-xl hover:bg-green-500 mb-4"
            >
              Play
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRestart();
            }}
            className="px-4 py-2 w-24 bg-red-600 rounded-xl hover:bg-red-500"
          >
            Restart
          </button>
        </div>
        <p className="mt-4 text-sm">
          Use arrow keys to move. Press space to pause/resume.
        </p>
      </div>
    </Section>
  );
};
