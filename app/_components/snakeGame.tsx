"use client";

import React, { useState } from "react";
import { Section } from "./ui/section";

type SquareValue = "X" | "O" | null;

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export const SnakeGame = () => {
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isVsBot, setIsVsBot] = useState(false);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  const botMove = () => {
    const emptySquares = squares
      .map((square, index) => (square === null ? index : null))
      .filter((index): index is number => index !== null);

    if (emptySquares.length > 0) {
      const randomIndex =
        emptySquares[Math.floor(Math.random() * emptySquares.length)];
      const newSquares = squares.slice();
      newSquares[randomIndex] = "O";
      setSquares(newSquares);
      setXIsNext(true);
    }
  };

  const handleClick = (i: number) => {
    if (calculateWinner(squares) || squares[i] || (!xIsNext && isVsBot)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);

    if (isVsBot && !calculateWinner(newSquares)) {
      setTimeout(botMove, 500);
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const toggleBot = () => {
    setIsVsBot(!isVsBot);
    handleRestart();
  };

  const renderSquare = (i: number) => (
    <button
      className="w-20 h-20 border border-gray-400 text-4xl font-bold bg-gray-800 hover:bg-gray-700"
      onClick={() => handleClick(i)}
    >
      {squares[i]}
    </button>
  );

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Game is a draw!"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <Section>
      <h2 className="scroll-m-20 mb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 font-caption">
        Hey, already finished?
      </h2>
      <p className="mb-12">
        Before leaving, get some rest and play this chill game.
      </p>
      <div className="flex flex-col items-center text-white">
        <h1 className="text-2xl font-bold mb-4">Tic Tac Toe</h1>
        <div className="mb-4 text-lg">{status}</div>
        <div className="grid grid-cols-3 gap-1 mb-4">
          {[...Array(9)].map((_, i) => (
            <React.Fragment key={i}>{renderSquare(i)}</React.Fragment>
          ))}
        </div>

        <div className="flex gap-4 mb-4">
          <button
            onClick={handleRestart}
            className="px-4 py-2 w-24 bg-blue-600 rounded-xl hover:bg-blue-500"
          >
            Restart
          </button>
          <button
            onClick={toggleBot}
            className="px-4 py-2 bg-green-600 rounded-xl hover:bg-green-500"
          >
            {isVsBot ? "Play vs Human" : "Play vs Bot"}
          </button>
        </div>
        <p className="mt-4 text-sm">
          {isVsBot
            ? "Play as X against the bot"
            : "Click on squares to play. X goes first."}
        </p>
        <h1 className="text-4xl font-semibold py-12">GoodBye 👋</h1>
      </div>
    </Section>
  );
};
