import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { IconButton } from '@material-ui/core'

momentDurationFormatSetup(moment)

export default function Timer({ timerLabel, timeLeft, isActive, handleReset, audioElement }) {
    const [active, setActive] = isActive    
    return (
        <div className="timer" style={{ color: 'white' }}>
        <div className="timer-wrapper">
            <div id="timer-label" style={{ fontSize: '50px' }}>{timerLabel}</div>
            <div id="time-left" style={{ fontSize: '50px' }}>{timeLeft === 3600000 ? "60:00" : moment(timeLeft).format('mm:ss')}</div>
            <IconButton id="start_stop" onClick={() => setActive(!active)}>
                { active ? <StopIcon style={{ fill: 'white' }} /> : <PlayArrowIcon style={{ fill: 'white' }} />}
            </IconButton>
            <IconButton id="reset" onClick={handleReset}>
                <RotateLeftIcon style={{ fill: 'white' }} />
            </IconButton>
            <audio 
            id="beep" 
            preload="auto" 
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            ref={audioElement}></audio>
        </div>
        </div>
    )
}
