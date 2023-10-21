import React, { useState, useRef } from "react";
import errorImg from "../imgs/error.png"

const Login = () => {
  const [isEmailPresent, setIsEmailPresent] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const emailRef = useRef();

  function toggleExistingUser() {
    setIsExistingUser((prevIsExistingUser) => {
      return !prevIsExistingUser;
    });
  }

  function toggleEmailError() {
    setIsEmailError((prevIsEmailError) => {
        return !prevIsEmailError
    })
  }

  function toggleEmail() {
    setIsEmailPresent((prevIsEmailPresent) => {
      return !prevIsEmailPresent;
    });
  }

  function continueClick() {
    const response = {
      name: {
        firstName: "Matthew",
        middleName: "",
        lastName: "",
      },
      gameIndex: 1,
      authInfo: {
        authToken: "fsdfsdfsdfsdfs",
        isAuthenticated: true,
      },
      contactInfo: {
        email: "testUser1@gmail.com",
        username: "testUser1",
        password: "123",
      },
      preferences: {
        darkMode: true,
        hardMode: false,
        contrastMode: false,
      },
      games: [
        {
          won: true,
          totalGuesses: 2,
          guesses: [
            [
              {
                letter: "H",
                isCorrect: "correct",
              },
              {
                letter: "O",
                isCorrect: "almost",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "Y",
                isCorrect: "wrong",
              },
            ],
            [
              {
                letter: "H",
                isCorrect: "correct",
              },
              {
                letter: "E",
                isCorrect: "correct",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "O",
                isCorrect: "correct",
              },
            ],
          ],
          word: ["H", "E", "L", "L", "O"],
          hardMode: true,
        },
        {
          won: true,
          totalGuesses: 2,
          guesses: [
            [
              {
                letter: "H",
                isCorrect: "wrong",
              },
              {
                letter: "E",
                isCorrect: "wrong",
              },
              {
                letter: "L",
                isCorrect: "almost",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "O",
                isCorrect: "almost",
              },
            ],
            [
              {
                letter: "W",
                isCorrect: "correct",
              },
              {
                letter: "O",
                isCorrect: "correct",
              },
              {
                letter: "R",
                isCorrect: "correct",
              },
              {
                letter: "L",
                isCorrect: "correct",
              },
              {
                letter: "D",
                isCorrect: "correct",
              },
            ],
          ],
          word: ["W", "O", "R", "L", "D"],
          hardMode: true,
        },
      ],
    };

    if (!response.error) {
        const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
        if (regex.test(emailRef.current.value)) {
            toggleEmail();
            toggleExistingUser();
        } else {
            toggleEmailError()
        }
    } else {
      toggleEmail();
    }
  }
  return (
    <div className="page login-page">
      <div className="page-content login-page-content">
        <h1 className="header">MDC Wordle</h1>
        <hr />
        <h2 className="login-header-sub-content">
          Log in or create an account
        </h2>
        <div className="input-fields">
          <div className="input-field">
            <label htmlFor="email">Email address</label>
            <input ref={emailRef} type="email" className={isEmailError ? "input-error" : ""}/>
            <span id="email-error" className={isEmailError ? "email-error" : "email-error hidden"}><img src={errorImg} alt="error icon" /> Please enter a valid email address.</span>
          </div>
          {isEmailPresent ? (
            <>
              {isExistingUser ? (
                <>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" />
                  </div>
                  <a href="#">Forgot your password?</a>
                  <button className="login-button">Log In</button>
                  <button className="login-button-alt">
                    Log in without password
                  </button>
                </>
              ) : (
                <>
                  <div className="input-field">
                    <label htmlFor="password">Password</label>
                    <input type="password" />
                  </div>
                  <a href="#">Forgot your password?</a>
                  <button className="login-button">Register</button>
                </>
              )}
            </>
          ) : (
            <button className="login-button" onClick={continueClick}>Continue</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
