import React, { useState, useEffect } from "react";
import { BsBackspace } from "react-icons/bs";
import GuessRow from "../components/guess-row";

const Game = () => {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Back"],
  ];
  const guessRowsArr = [
    "guess-1",
    "guess-2",
    "guess-3",
    "guess-4",
    "guess-5",
    "guess-6",
  ];
  const [currentUserWord, setCurrentUserWord] = useState([]);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(1);

  function increaseIndex() {
    setCurrentGuessIndex((prevCurrentGuessIndex) => {
      return prevCurrentGuessIndex + 1;
    });
  }

  function decreaseIndex() {
    setCurrentGuessIndex((prevCurrentGuessIndex) => {
      return prevCurrentGuessIndex - 1;
    });
  }

  function updateWord(e) {
    console.log(currentGuessIndex, e.target.id);
    if (e.target.id === "backspace") {
      let guessArr = [
        ...document.getElementById(`row-guess-${currentAttempt}`).children,
      ];
      decreaseIndex();
      console.log(currentGuessIndex);
      guessArr[currentGuessIndex - 1].innerHTML = "";
    } else {
      if (currentGuessIndex < 4) {
        let guessArr = [
          ...document.getElementById(`row-guess-${currentAttempt}`).children,
        ];
        guessArr[currentGuessIndex].innerHTML = e.target.value;
        increaseIndex();
      } else {
        let guessArr = [
          ...document.getElementById(`row-guess-${currentAttempt}`).children,
        ];
        guessArr[currentGuessIndex].innerHTML = e.target.value;
      }
    }
  }

  return (
    <div className="game-page page">
      <div className="page-content">
        <div className="game-window">
          {guessRowsArr.map((attempt, i) => {
            return <GuessRow attempt={attempt} iteration={i} />;
          })}
        </div>
        <div className="keyboard-container">
          {rows.map((row) => {
            return (
              <div className="row">
                {row.map((letter) => {
                  return letter !== "Back" ? (
                    <button
                      id={`letter-${letter}`}
                      value={letter}
                      onClick={(e) => updateWord(e)}
                    >
                      {letter}
                    </button>
                  ) : (
                    <button
                      id={"backspace"}
                      data={letter}
                      onClick={(e) => updateWord(e)}
                    >
                      {<BsBackspace />}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Game;
