import React, { useState, useEffect }from 'react';
import { BsBackspace } from "react-icons/bs";

const Keyboard = (props) => {
    const rows = [['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'], ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'], ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Back']]
    const currentGuess = props.currentGuess;
    const guessedLetter = props.guessedLetters;
    return (
        <div className="keyboard-container">
            {rows.map((row) => {
                return (
                    <div className="row">
                    {row.map((letter) => {
                        return letter !== 'Back' ? <button id={`letter-${letter}`}value={letter}>{letter}</button> : <button id={'backspace'} value={letter}>{<BsBackspace />}</button>
                    })}
                </div>
                )
            })}
        </div>
    );
}

export default Keyboard;
