import React, { useState } from "react";
import Board from "./components/Board";
import "./App.css";

import clickSound from "./sounds/click.mp3";
import winSound from "./sounds/win.mp3";
import drawSound from "./sounds/draw.mp3";

const clickAudio = new Audio(clickSound);
const winAudio = new Audio(winSound);
const drawAudio = new Audio(drawSound);

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function App() {
  const [cells, setCells] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // ✅ ADD THIS
  const [winningCells, setWinningCells] = useState([]);
  const [winningPattern, setWinningPattern] = useState(null);

  const handleClick = (index) => {
    if (cells[index] !== "" || winner) return;

    clickAudio.currentTime = 0;
    clickAudio.play();

    const newCells = [...cells];
    newCells[index] = currentPlayer;
    setCells(newCells);

    checkWinner(newCells);

    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
  };

  const checkWinner = (board) => {
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);

        // ✅ IMPORTANT
        setWinningCells(pattern);
        setWinningPattern(pattern);

        winAudio.currentTime = 0;
        winAudio.play();
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("Draw");
      drawAudio.currentTime = 0;
      drawAudio.play();
    }
  };

  const resetGame = () => {
    setCells(Array(9).fill(""));
    setWinner(null);
    setWinningCells([]); // ✅ fix
    setWinningPattern(null);
    setCurrentPlayer("X");
  };

  return (
    <div className="app">
      <h1>🎮 Tic Tac Toe</h1>

      <h2>
        {winner
          ? winner === "Draw"
            ? "Draw Game!"
            : `Winner: ${winner}`
          : `Turn: ${currentPlayer}`}
      </h2>

      <Board
        cells={cells}
        onClick={handleClick}
        winningCells={winningCells}
        winningPattern={winningPattern}
      />

      <button onClick={resetGame}>Restart</button>
    </div>
  );
}

export default App;