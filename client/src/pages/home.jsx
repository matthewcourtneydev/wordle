import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/user-context";
import img from "../imgs/logo.webp";

const Home = () => {
  const user = useContext(UserContext);
  const [loggedIn, setLoggedIn] = useState(user.authInfo.isAuthenticated);

  return (
    <div className="home-page page">
      <div className="page-content">
        <img src={img} alt="" />
        <h1>Wordle</h1>
        <h2>Get 6 chances to guess a 5-letter word.</h2>
        {loggedIn ? (
          <div className="button-container">
            <a href={"/game"} id="play">
              Play
            </a>
          </div>
        ) : (
          <div className="button-container">
            <a href={"/game"} id="play">
              Play
            </a>
            <a href={"/login"}>Log in</a>
            <a href={"/game"}>How to play</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
