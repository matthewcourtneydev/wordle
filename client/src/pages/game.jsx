import React, { useState, useEffect } from "react";
import { BsBackspace } from "react-icons/bs";
import GuessRow from "../components/guess-row";
import StatsModal from "../components/stats-modal";
import SetingsModal from "../components/setings-modal";
import HelpModal from "../components/help-modal";
import Nav from "../components/nav";
import "../animate.css";

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
  const [modalHidden, setModalHidden] = useState(true);
  const [isSettingsClosed, setIsSettingsClosed] = useState(true);
  const [isHelpClosed, setIsHelpClosed] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHighContrastMode, setIsHighContrastMode] = useState(false)

  const testWord = ["H", "E", "L", "L", "O"];

  function closeModal() {
    setModalHidden((prevSetModalHidden) => {
      return !prevSetModalHidden;
    });
  }

  function toggleDarkMode() {
    setIsDarkMode((prevIsDarkMode) => {
      return !prevIsDarkMode;
    });
  }

  function toggleContrast() {
    setIsHighContrastMode((prevIsHighContrastMode) => {
      return !prevIsHighContrastMode;
    })
  }

  function toggleSettings() {
    setIsSettingsClosed((prevIsSettingsClosed) => {
      return !prevIsSettingsClosed;
    });
  }

  function toggleHelp() {
    setIsHelpClosed((prevIsHelpClosed) => {
      return !prevIsHelpClosed;
    });
  }

  function increaseIndex() {
    setCurrentGuessIndex((prevCurrentGuessIndex) => {
      return prevCurrentGuessIndex + 1;
    });
  }

  function increaseAttempt() {
    setCurrentAttempt((prevCurrentAttempt) => {
      return prevCurrentAttempt + 1;
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
      console.log("Not Enough Letters");
      document
        .getElementById(`row-guess-${currentAttempt}`)
        .classList.add("error-shake");
      document
        .getElementById(`error-row-guess-${currentAttempt}`)
        .classList.remove("hide");
      setTimeout(function () {
        document
          .getElementById(`row-guess-${currentAttempt}`)
          .classList.remove("error-shake");
        document
          .getElementById(`error-row-guess-${currentAttempt}`)
          .classList.add("hide");
      }, 2000);
    } else {
      const guessArr = [
        ...document.getElementById(`row-guess-${currentAttempt}`).children,
      ];

      let correctCount = 0;
      guessArr.slice(0, -1).forEach((guess, i) => {
        console.log(guess.innerHTML);
        if (guess.innerHTML === testWord[i]) {
          correctCount++;
          setTimeout(function () {
            guess.classList.add((isHighContrastMode ? "correct-flip-contrast" : "correct-flip"));
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add((isHighContrastMode ? "correct-contrast" : "correct"));
          }, 500 * (i + 1));
        } else if (testWord.includes(guess.innerHTML)) {
          setTimeout(function () {
            guess.classList.add((isHighContrastMode ? "almost-flip-contrast" : "almost-flip"));
            if (
              !document
                .getElementById(`letter-${guess.innerHTML}`)
                .classList.contains(("correct"))
            ) {
              document
                .getElementById(`letter-${guess.innerHTML}`)
                .classList.add((isHighContrastMode ? "almost-contrast" : "almost"));
            }
          }, 500 * (i + 1));
        } else {
          setTimeout(function () {
            guess.classList.add("wrong-flip");
            if (
              !document
                .getElementById(`letter-${guess.innerHTML}`)
                .classList.contains("correct") ||
              !document
                .getElementById(`letter-${guess.innerHTML}`)
                .classList.includes("almost")
            ) {
              document
                .getElementById(`letter-${guess.innerHTML}`)
                .classList.add(isHighContrastMode ? "wrong-contrast" : "wrong");
            }
          }, 500 * (i + 1));
        }
      });

      if (correctCount === 5) {
        console.log("game won");
      } else if (currentAttempt === 6) {
        console.log("game lost out of attempts");
      } else {
        console.log("game continues");
        increaseAttempt();
        setCurrentGuessIndex(0);
        return;
      }
    }
  }

  useEffect(() => {
    console.log(isHighContrastMode)
    if(isHighContrastMode) {
      const correct = document.querySelectorAll('.correct-flip');
      const correctBtns = document.querySelectorAll('.correct');
      const almost = document.querySelectorAll('.almost-flip');
      const almostBtns = document.querySelectorAll('.almost');
      correct.forEach((el) => {
        console.log(el)
        el.classList.remove('correct-flip');
        el.classList.add('correct-flip-contrast')
      })
      almost.forEach((el) => {
        console.log(el)
        el.classList.remove('almost-flip');
        el.classList.add('almost-flip-contrast')
      })
      correctBtns.forEach((el) => {
        console.log(el)
        el.classList.remove('correct');
        el.classList.add('correct-contrast')
      })
      almostBtns.forEach((el) => {
        console.log(el)
        el.classList.remove('almost');
        el.classList.add('almost-contrast')
      })
    } else {
      const correct = document.querySelectorAll('.correct-flip-contrast');
      const correctBtns = document.querySelectorAll('.correct-contrast');
      const almost = document.querySelectorAll('.almost-flip-contrast');
      const almostBtns = document.querySelectorAll('.almost-contrast');
      correct.forEach((el) => {
        console.log(el)
        el.classList.remove('correct-flip-contrast');
        el.classList.add('correct-flip')
      })
      almost.forEach((el) => {
        console.log(el)
        el.classList.remove('almost-flip-contrast');
        el.classList.add('almost-flip')
      })
      correctBtns.forEach((el) => {
        console.log(el)
        el.classList.remove('correct-contrast');
        el.classList.add('correct')
      })
      almostBtns.forEach((el) => {
        console.log(el)
        el.classList.remove('almost-contrast');
        el.classList.add('almost')
      })

    }
  }, [isHighContrastMode])

  function updateWord(e) {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    if (e.target.id === "backspace") {
      if (currentGuessIndex > 0) {
        guessArr[currentGuessIndex - 1].innerHTML = "";
        guessArr[currentGuessIndex - 1].classList.remove("value-present");
        decreaseIndex();
      }
    } else if (e.target.id === "letter-Enter") {
      handleEnter();
    } else {
      if (currentGuessIndex <= 4) {
        guessArr[currentGuessIndex].innerHTML = e.target.value;
        guessArr[currentGuessIndex].classList.add("value-present");
        console.log(currentGuessIndex);
        increaseIndex();
      }
    }
  }

  return (
    <div className={isDarkMode ? "game-page page" : "game-page page light"}>
      {modalHidden ? (
        <Nav
          isModalClosed={modalHidden}
          closeModal={closeModal}
          isSettingsClosed={isSettingsClosed}
          closeSettings={toggleSettings}
          closeHelp={toggleHelp}
          isHelpClosed={isHelpClosed}
        />
      ) : (
        <></>
      )}
      <StatsModal isClosed={modalHidden} closeModal={closeModal} />
      <SetingsModal isClosed={isSettingsClosed} closeModal={toggleSettings} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} isHighContrastMode={isHighContrastMode} toggleContrast={toggleContrast}/>
      <HelpModal isClosed={isHelpClosed} closeModal={toggleHelp} isHighContrastMode={isHighContrastMode}/>
      <div className="page-content">
        <div className="game-window">
          {guessRowsArr.map((attempt, i) => {
            return <GuessRow attempt={attempt} iteration={i} />;
          })}
        </div>
        <div className={isHighContrastMode ? "keyboard-container contrast" : "keyboard-container"}>
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
