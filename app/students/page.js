

"use client";
import { useState, useEffect } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [lastWinner, setLastWinner] = useState("no winner yet");

  const fetchScores = async () => {
    try {
      const res = await fetch("http://localhost:8080/wins");
      const data = await res.json();
      setScores(data);
    } catch (err) {
      console.error("Error fetching scores:", err);
    }
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const winner = calculateWinner(squares);
  useEffect(() => {
    if (winner) {
      setLastWinner("last winner: " + winner);

      fetch("http://localhost:8080/wins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ player: winner }),
      })
        .then(() => fetchScores())
        .catch((err) => console.error("Error updating win:", err));
    }
  }, [winner]);

  const newGame = async () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setLastWinner("no winner yet");
  };

  return (
    <>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`}
      </div>

      <div className="board-row">
        {squares.slice(0, 3).map((val, idx) => (
          <Square key={idx} value={val} onSquareClick={() => handleClick(idx)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(3, 6).map((val, idx) => (
          <Square key={idx + 3} value={val} onSquareClick={() => handleClick(idx + 3)} />
        ))}
      </div>
      <div className="board-row">
        {squares.slice(6, 9).map((val, idx) => (
          <Square key={idx + 6} value={val} onSquareClick={() => handleClick(idx + 6)} />
        ))}
      </div>

      <div className="lastWinner">{lastWinner}</div>

      <div className="scoreBoard">
        <p>X Wins: {scores.X}</p>
        <p>O Wins: {scores.O}</p>
      </div>

      <button onClick={newGame}>Start New Game</button>
    </>
  );
}

function calculateWinner(squares) {
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
}



