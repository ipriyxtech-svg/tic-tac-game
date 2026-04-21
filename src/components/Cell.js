import React from "react";

const Cell = ({ value, onClick, isWinning }) => {
  return (
    <div
      className={`cell ${isWinning ? "win" : ""}`}
      onClick={onClick}
      style={{ color: value === "X" ? "#22c55e" : "#38bdf8" }}
    >
      {value}
    </div>
  );
};

export default Cell;