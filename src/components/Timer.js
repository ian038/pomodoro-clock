import React from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { IconButton } from '@material-ui/core'

momentDurationFormatSetup(moment)

export default function Timer({ timerLabel, timeLeft, handleStartStop, isActive, handleReset, audioElement }) {

    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })
    console.log(formattedTimeLeft)
    
    return (
        <div className="timer" style={{ color: 'white' }}>
        <div className="timer-wrapper">
            <div id="timer-label" style={{ fontSize: '50px' }}>{timerLabel}</div>
            <div id="time-left" style={{ fontSize: '50px' }}>{formattedTimeLeft}</div>
            <IconButton onClick={handleStartStop} id="start_stop">
                { isActive ? <StopIcon style={{ fill: 'white' }} /> : <PlayArrowIcon style={{ fill: 'white' }} />}
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
