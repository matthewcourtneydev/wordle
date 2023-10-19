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

  const testWord = ["H", "E", "L", "L", "O"];

  const guessRowsArr = [
    "guess-1",
    "guess-2",
    "guess-3",
    "guess-4",
    "guess-5",
    "guess-6",
  ];

  let basicGameData = {
    won: null,
    totalGuesses: null,
    guesses: [],
    word: null,
    hardMode: null,
  };

  let guessesTotals = [];

  const [currentWord, setCurrentWord] = useState(testWord);
  const [currentGuessIndex, setCurrentGuessIndex] = useState(0);
  const [currentAttempt, setCurrentAttempt] = useState(1);
  const [modalHidden, setModalHidden] = useState(true);
  const [isSettingsClosed, setIsSettingsClosed] = useState(true);
  const [isHelpClosed, setIsHelpClosed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isHighContrastMode, setIsHighContrastMode] = useState(false);
  const [isHardMode, setIsHardMode] = useState(true);
  const [gameGuessHistoryInfo, setGameGuessHistoryInfo] = useState([]);
  const [hardErrInfo, setIsHardErrorInfo] = useState(false);

  function displayHardError(error) {
    console.log(hardErrInfo);
    document
      .getElementById(`row-guess-${currentAttempt}`)
      .classList.add("error-shake");
    document.getElementById("error-hard-row-guess-1").classList.remove("hide");
    setTimeout(function () {
      document
        .getElementById(`row-guess-${currentAttempt}`)
        .classList.remove("error-shake");
      document.getElementById("error-hard-row-guess-1").classList.add("hide");
      setIsHardInfo();
    }, 2000);
  }

  function setIsHardInfo(info) {
    if (hardErrInfo) {
      setIsHardErrorInfo(false);
    } else {
      setIsHardErrorInfo((prev) => {
        return info;
      });
    }
  }

  function addGuessDataToArray(guessData) {
    console.log(gameGuessHistoryInfo, guessData)
    setGameGuessHistoryInfo((prevGuessHistory) => {
      return [...prevGuessHistory, guessData];
    });
  }
  
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

  function toggleHardMode() {
    setIsHardMode((prevIsHardMode) => {
      return !prevIsHardMode;
    });
  }

  function toggleContrast() {
    setIsHighContrastMode((prevIsHighContrastMode) => {
      return !prevIsHighContrastMode;
    });
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

  function continueGameLogic() {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    const guessData = [];
    let correctCount = 0;

    guessArr.slice(0, 5).forEach((guess, i) => {
      if (guess.innerHTML === currentWord[i]) {
        correctCount++;
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "correct",
        };
        guessData.push(guessIndexData);
        setTimeout(function () {
          guess.classList.add(
            isHighContrastMode ? "correct-flip-contrast" : "correct-flip"
          );
          if (document.getElementById(`letter-${guess.innerHTML}`)) {
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add(
                isHighContrastMode ? "correct-contrast" : "correct"
              );
          }
        }, 500 * (i + 1));
      } else if (currentWord.includes(guess.innerHTML)) {
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "almost",
        };
        guessData.push(guessIndexData);
        setTimeout(function () {
          guess.classList.add(
            isHighContrastMode ? "almost-flip-contrast" : "almost-flip"
          );
          if (
            !document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.contains("correct")
          ) {
            document
              .getElementById(`letter-${guess.innerHTML}`)
              .classList.add(isHighContrastMode ? "almost-contrast" : "almost");
          }
        }, 500 * (i + 1));
      } else {
        let guessIndexData = {
          letter: `${guess.innerHTML}`,
          isCorrect: "wrong",
        };
        guessData.push(guessIndexData);
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
      basicGameData.won = true;
      basicGameData.totalGuesses = currentAttempt;
      basicGameData.word = currentWord;
      basicGameData.hardMode = isHardMode;
      basicGameData.guesses = [...gameGuessHistoryInfo, guessData];

      console.log(basicGameData);
      // TO DO PATCH USER OR REDIRECT TO LOGIN
    } else if (currentAttempt === 6) {
      console.log(guessesTotals, guessData);
      addGuessDataToArray(guessData);
      basicGameData.won = false;
      basicGameData.totalGuesses = currentAttempt;
      basicGameData.word = currentWord;
      basicGameData.guesses = gameGuessHistoryInfo;

      // TO DO PATCH USER OR REDIRECT TO LOGIN
    } else {
      console.log(guessesTotals, guessData);
      addGuessDataToArray(guessData);
      increaseAttempt();
      setCurrentGuessIndex(0);
      return;
    }
  }

  function handleEnter() {
    if (currentGuessIndex < 5) {
      document
        .getElementById(`row-guess-${currentAttempt}`)
        .classList.add("error-shake");
      document.getElementById("error-row-guess-1").classList.remove("hide");
      setTimeout(function () {
        document
          .getElementById(`row-guess-${currentAttempt}`)
          .classList.remove("error-shake");
        document.getElementById("error-row-guess-1").classList.add("hide");
      }, 2000);
    } else {
      if (currentAttempt > 1 && isHardMode) {
        let prevGuessArray = [];
        let currentGuessArr = [];

        const guessArr = [
          ...document.getElementById(`row-guess-${currentAttempt - 1}`)
            .children,
        ];
        for (let i = 0; i < 5; i++) {
          const element = guessArr[i];
          prevGuessArray.push({
            letter: element.innerHTML,
            isCorrect: element.innerHTML === currentWord[i],
          });
        }

        const newGuessArr = [
          ...document.getElementById(`row-guess-${currentAttempt}`).children,
        ];

        newGuessArr.slice(0, 5).forEach((guess) => {
          currentGuessArr.push(guess.innerHTML);
        });

        let error = false;

        for (let i = 0; i < prevGuessArray.length; i++) {
          const prevGuess = prevGuessArray[i];
          if (prevGuess.isCorrect === true) {
            if (prevGuess.letter !== currentGuessArr[i]) {
              error = {
                letter: prevGuess.letter,
                index: i,
              };

              break;
            }
          }
        }

        if (error) {
          setIsHardInfo(error);
          displayHardError(error);
        } else {
          continueGameLogic();
        }
      } else {
        continueGameLogic();
      }
    }
  }

  useEffect(() => {
    if (isHighContrastMode) {
      const correct = document.querySelectorAll(".correct-flip");
      const correctBtns = document.querySelectorAll(".correct");
      const almost = document.querySelectorAll(".almost-flip");
      const almostBtns = document.querySelectorAll(".almost");
      correct.forEach((el) => {
        el.classList.remove("correct-flip");
        el.classList.add("correct-flip-contrast");
      });
      almost.forEach((el) => {
        el.classList.remove("almost-flip");
        el.classList.add("almost-flip-contrast");
      });
      correctBtns.forEach((el) => {
        el.classList.remove("correct");
        el.classList.add("correct-contrast");
      });
      almostBtns.forEach((el) => {
        el.classList.remove("almost");
        el.classList.add("almost-contrast");
      });
    } else {
      const correct = document.querySelectorAll(".correct-flip-contrast");
      const correctBtns = document.querySelectorAll(".correct-contrast");
      const almost = document.querySelectorAll(".almost-flip-contrast");
      const almostBtns = document.querySelectorAll(".almost-contrast");
      correct.forEach((el) => {
        el.classList.remove("correct-flip-contrast");
        el.classList.add("correct-flip");
      });
      almost.forEach((el) => {
        el.classList.remove("almost-flip-contrast");
        el.classList.add("almost-flip");
      });
      correctBtns.forEach((el) => {
        el.classList.remove("correct-contrast");
        el.classList.add("correct");
      });
      almostBtns.forEach((el) => {
        el.classList.remove("almost-contrast");
        el.classList.add("almost");
      });
    }
  }, [isHighContrastMode]);

  function updateWord(e) {
    const guessArr = [
      ...document.getElementById(`row-guess-${currentAttempt}`).children,
    ];
    if (e.target.id === "backspace") {
      if (currentGuessIndex > 0) {
        guessArr[currentGuessIndex - 1].innerHTML = "";
        guessArr[currentGuessIndex - 1].classList.remove("value-present");
        decreaseIndex();
        setIsHardErrorInfo(false);
      }
    } else if (e.target.id === "letter-Enter") {
      handleEnter();
    } else {
      if (currentGuessIndex <= 4) {
        guessArr[currentGuessIndex].innerHTML = e.target.value;
        guessArr[currentGuessIndex].classList.add("value-present");
        increaseIndex();
      }
    }
  }

  useEffect(() => {
    console.log("Hard Mode:", isHardMode);
  }, [isHardMode]);

  useEffect(() => {
    console.log("Hard Error Info:", hardErrInfo);
  }, [hardErrInfo]);

  useEffect(() => {
    console.log("game guess Info:", gameGuessHistoryInfo);
  }, [gameGuessHistoryInfo]);

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
      <SetingsModal
        isClosed={isSettingsClosed}
        closeModal={toggleSettings}
        toggleDarkMode={toggleDarkMode}
        isDarkMode={isDarkMode}
        isHighContrastMode={isHighContrastMode}
        toggleContrast={toggleContrast}
        isHardMode={isHardMode}
        toggleHardMode={toggleHardMode}
      />
      <HelpModal
        isClosed={isHelpClosed}
        closeModal={toggleHelp}
        isHighContrastMode={isHighContrastMode}
      />
      <div className="page-content">
        <div className="game-window">
          {guessRowsArr.map((attempt, i) => {
            return (
              <GuessRow attempt={attempt} iteration={i} error={hardErrInfo} />
            );
          })}
        </div>
        <div
          className={
            isHighContrastMode
              ? "keyboard-container contrast"
              : "keyboard-container"
          }
        >
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
