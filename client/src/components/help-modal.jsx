import React from "react";

const HelpModal = ({ isClosed, closeModal }) => {
  return (
    <div className={isClosed ? "help-modal-layer closed" : "help-modal-layer"}>
      <div className="modal-content">
        <div onClick={() => closeModal()} className="close">
          X
        </div>
        <div className="help-section-content">
            <h1 className="title">How To Play</h1>
            <h2>Guess the Wordle in 6 tries.</h2>
            <ul>
                <li>Each guess must be a valid 5 letter word.</li>
                <li>The color of the tiles will change to show you how close your guess was to the word.</li>
            </ul>
            <p>Examples</p>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
