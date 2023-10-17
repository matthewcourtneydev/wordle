import React from 'react';

const GuessRow = (props) => {
    return (
        <div id={`row-${props.attempt}`} className="guess-row">
            <div className="box guess-1"></div>
            <div className="box guess-2"></div>
            <div className="box guess-3"></div>
            <div className="box guess-4"></div>
            <div className="box guess-5"></div>
            <div id={`error-row-${props.attempt}`} className={"error hide"}>Not enough letters</div>
        </div>
    );
}

export default GuessRow;
