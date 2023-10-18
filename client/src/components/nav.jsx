import React from 'react';
import { UilBars, UilQuestionCircle, UilGraphBar, UilSetting } from '@iconscout/react-unicons'

const Nav = ({isModalClosed, closeModal, closeSettings, isSettingsClosed, closeHelp, isHelpClosed}) => {
    return (
        <nav className="nav-bar">
            <div className="left">
            <UilBars />
            <p>Wordle</p>
            </div>
            <div className="right">
            <span><UilQuestionCircle onClick={() => closeHelp()}/></span>
            <span><UilGraphBar onClick={() => closeModal()}/></span>
            <span><UilSetting onClick={() => closeSettings()}/></span>
            </div>

        </nav>
    );
}

export default Nav;
