import React, { useState, useEffect } from "react";
import { BsBackspace } from "react-icons/bs";
import GuessRow from "../components/guess-row";
import '../animate.css'

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

  const testWord = ['H', 'E', 'L', 'L', 'O']

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

  function handleEnter() {
    console.log(currentGuessIndex);
    if (currentGuessIndex < 5) {
        console.log('Not Enough Letters');
        document.getElementById(`row-guess-${currentAttempt}`).classList.add('error-shake');
        document.getElementById(`error-row-guess-${currentAttempt}`).classList.remove('hide');
        setTimeout(function () {
            document.getElementById(`row-guess-${currentAttempt}`).classList.remove('error-shake');
            document.getElementById(`error-row-guess-${currentAttempt}`).classList.add('hide')
        }, 2000);
    } else {
        const guessArr = [
            ...document.getElementById(`row-guess-${currentAttempt}`).children,
          ];


       guessArr.slice(0, -1).forEach((guess, i) => {
        if (guess.innerHTML === testWord[i]) {
            setTimeout(function () {
                guess.classList.add('correct-flip')
            }, (500 * (i + 1)));
        } else if (testWord.includes(guess.innerHTML)) {
            setTimeout(function () {
                guess.classList.add('almost-flip')
            }, (500 * (i + 1)));
        } else {
            setTimeout(function () {
                guess.classList.add('wrong-flip')
            }, (500 * (i + 1)));
        }
       })

    }
  }

  function updateWord(e) {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    if (e.target.id === "backspace") {
        if (currentGuessIndex > 0) {
            guessArr[currentGuessIndex - 1].innerHTML = "";
            guessArr[currentGuessIndex - 1].classList.remove('value-present');
            decreaseIndex();
        }
    } else if (e.target.id === "letter-Enter") {
        handleEnter()
    } else {
      if (currentGuessIndex <= 4) {
        guessArr[currentGuessIndex].innerHTML = e.target.value;
        guessArr[currentGuessIndex].classList.add('value-present');
        console.log(currentGuessIndex)
        increaseIndex();
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
