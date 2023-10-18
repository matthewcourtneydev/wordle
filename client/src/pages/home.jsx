import React from 'react';
import img from '../imgs/logo.webp'

const Home = () => {
    return (
        <div className="home-page page">
            <div className="page-content">
                <img src={img} alt="" />
                <h1>Wordle</h1>
                <h2>Get 6 chances to guess a 5-letter word.</h2>
                <div className="button-container">
                    <a href={'/game'} id="play">Play</a>
                    <a href={'/'}>Log in</a>
                    <a href={'/'}>How to play</a>
                </div>
            </div>
        </div>
    );
}

export default Home;
