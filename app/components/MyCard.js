
/*
"use client";


function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  let lastWinnerText = "no winner yet";
  let xWins = 0;
  let oWins = 0;
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
    lastWinnerText = "last winner: "+winner;
    if (winner=='X') {
      xWins+=1;
    }
    if (winner=='O') {
      oWins+=1;
    }
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div className="lastWinner">{lastWinnerText}</div>
      <div className="scoreBoard">{"x: "+xWins.toString()+" o: "+oWins.toString()}</div>
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
*/

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
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [lastWinner, setLastWinner] = useState("no winner yet");

  // Load scores when component mounts
  useEffect(() => {
    fetch("http://localhost:5000/api/scores")
      .then(res => res.json())
      .then(data => {
        setXWins(data.xWins);
        setOWins(data.oWins);
      })
      .catch(err => console.error("Error loading scores:", err));
  }, []);

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // 🆕 Reset the board for a new game
  function newGame() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setLastWinner("no winner yet");
    // ✅ notice we do NOT touch xWins or oWins here
  }

  const winner = calculateWinner(squares);
  let status;

  useEffect(() => {
    if (winner) {
      setLastWinner("last winner: " + winner);

      // tell backend to increment score
      fetch(`http://localhost:5000/api/scores/${winner}`, {
        method: "POST"
      })
        .then(res => res.json())
        .then(data => {
          setXWins(data.xWins);
          setOWins(data.oWins);
        })
        .catch(err => console.error("Error updating score:", err));
    }
  }, [winner]);

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className="lastWinner">{lastWinner}</div>
      <div className="scoreBoard">
        {"X: " + xWins.toString() + " | O: " + oWins.toString()}
      </div>

      {/* 🆕 Button to reset the board */}
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
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
