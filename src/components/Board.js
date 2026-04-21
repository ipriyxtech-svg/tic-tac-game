import React from "react";
import Cell from "./Cell";

const Board = ({ cells, onClick, winningCells, winningPattern }) => {
  return (
    <div className="board">
      {cells.map((cell, index) => (
        <Cell
          key={index}
          value={cell}
          onClick={() => onClick(index)}
          isWinning={winningCells.includes(index)}
        />
      ))}

      {/* 🔥 WINNER LINE */}
      {winningPattern && (
        <div className={`win-line ${getLineClass(winningPattern)}`}></div>
      )}
    </div>
  );
};

/* 🎯 Pattern → CSS class */
const getLineClass = (pattern) => {
  const map = {
    "0,1,2": "row1",
    "3,4,5": "row2",
    "6,7,8": "row3",
    "0,3,6": "col1",
    "1,4,7": "col2",
    "2,5,8": "col3",
    "0,4,8": "diag1",
    "2,4,6": "diag2",
  };

  return map[pattern.join(",")];
};

export default Board;