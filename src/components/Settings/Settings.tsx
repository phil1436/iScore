import React from 'react';
import '../global.scss';
import DoubleBtn from '../DoubleBtn/DoubleBtn.tsx';
import './Settings.scss';
import { Link } from 'react-router-dom';
import { useResetTimer } from '../../providers/TimeProvider.tsx';

function Settings() {
    const btnWidth = window.innerWidth * 0.9;

    const resetTimer = useResetTimer();

    return (
        <div className="container settingsBox">
            <div className="display">
                <div className="displayText">Settings</div>
            </div>
            <DoubleBtn
                onClick={resetTimer}
                btnWidth={btnWidth}
                middleText={true}
            >
                Reset Timer
            </DoubleBtn>
            <DoubleBtn onClick={() => {}} btnWidth={btnWidth} middleText={true}>
                Reset All
            </DoubleBtn>
            <Link to="/">
                <DoubleBtn
                    onClick={() => {}}
                    btnWidth={btnWidth}
                    middleText={true}
                >
                    Back
                </DoubleBtn>
            </Link>
        </div>
    );
}

export default Settings;
