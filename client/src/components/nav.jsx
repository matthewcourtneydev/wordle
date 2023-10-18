import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UilBars, UilQuestionCircle, UilGraphBar, UilSetting } from '@iconscout/react-unicons'

const Nav = ({isModalClosed, closeModal, closeSettings, isSettingsClosed, closeHelp, isHelpClosed}) => {
    const navigate = useNavigate();
    useEffect(() => {
        document.querySelector('.home-link').addEventListener('click', () => {
            navigate('/')
        })
    }, [])
    
    return (
        <nav className="nav-bar">
            <div className="left">
            <UilBars />
            <p className="home-link">Wordle</p>
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
