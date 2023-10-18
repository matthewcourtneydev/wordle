import React, { useEffect } from "react";

const SetingsModal = ({ isClosed, closeModal, isDarkMode, toggleDarkMode }) => {
 
  useEffect(() => {
    const darkModeCheckbox =  document.getElementById('checkbox-dark');
    darkModeCheckbox.addEventListener('change', () => {
      toggleDarkMode()
    })
    
  }, [])

  return (
    <div
      className={
        isClosed ? "settings-modal-layer closed" : "settings-modal-layer"
      }
    >
      <div className="modal-menu">
        <div className="modal-menu-content">
          <h1>SETTINGS</h1>
          <div onClick={() => closeModal()} className="close">
            X
          </div>
          <div className="settings-container">
            <div className="content-section difficulty">
              <div className="settings-left">
                <h2>Hard Mode</h2>
                <p>Any revealed hints must be used in subsequent guesses</p>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <label className="toggle">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="content-section theme">
              <div className="settings-left">
                <h2>Dark Theme</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <label className="toggle">
                    <input id="checkbox-dark" type="checkbox" checked={isDarkMode}/>
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>
            <div className="content-section contrast">
              <div className="settings-left">
                <h2>High Contrast Mode</h2>
                <p>For improved color vision</p>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <label className="toggle">
                    <input type="checkbox" />
                    <span class="slider round"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="content-section feedback">
              <div className="settings-left">
                <h2>Feedback</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
            <div className="content-section report">
              <div className="settings-left">
                <h2>Report a Bug</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Email</a>
                </div>
              </div>
            </div>
            <div className="content-section community">
              <div className="settings-left">
                <h2>Community</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">Wordle Review</a>
                </div>
              </div>
            </div>
            <div className="content-section questions">
              <div className="settings-left">
                <h2>Questions</h2>
              </div>
              <div className="settings-right">
                <div className="text-container">
                  <a href="#">FAQ</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetingsModal;
