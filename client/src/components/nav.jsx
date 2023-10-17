import React from 'react';
import { UilBars, UilQuestionCircle, UilGraphBar, UilSetting } from '@iconscout/react-unicons'

const Nav = ({isModalClosed, closeModal}) => {
    return (
        <nav className="nav-bar">
            <div className="left">
            <UilBars />
            <p>Wordle</p>
            </div>
            <div className="right">
            <span><UilQuestionCircle /></span>
            <span><UilGraphBar onClick={() => closeModal()}/></span>
            <span><UilSetting /></span>
            </div>

        </nav>
    );
}

export default Nav;
