import React, { useState, useEffect, useRef } from 'react';
import './styles.css'

import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer'

function App() {
  const audioElement = useRef(null)
  const [breakLength, setBreakLength] = useState(60 * 5)
  const [sessionLength, setSessionLength] = useState(60 * 25)
  const [currSessionType, setCurrSessionType] = useState('Session')
  const [timeLeft, setTimeLeft] = useState(sessionLength)
  const [intervalID, setIntervalID] = useState(null)

  // dynamically change time left
  useEffect(() => {
      setTimeLeft(sessionLength)
  }, [sessionLength])

  // listen to time left 
  useEffect(() => {
    if(timeLeft === 0) {
      audioElement.current.play()
      if(currSessionType === 'Session') {
        setCurrSessionType('Break')
        setTimeLeft(breakLength)
      } else if(currSessionType === 'Break') {
        setCurrSessionType('Session')
        setTimeLeft(sessionLength)
      }
    }
  }, [breakLength, currSessionType, sessionLength, timeLeft])

  const decrementBreakLength = () => {
      const newBreakLength = breakLength - 60
      if(newBreakLength > 0) {
        setBreakLength(newBreakLength)
      }
    }
  
  const incrementBreakLength = () => {
    const newBreakLength = breakLength + 60
    if(newBreakLength <= 60 * 60) {
      setBreakLength(newBreakLength)
    }
  }
  
  const decrementSessionLength = () => {
    const newSessionLength = sessionLength - 60
    if(newSessionLength > 0) {
      setSessionLength(newSessionLength)
    }
  }

  const incrementSessionLength = () => {
    const newSessionLength = sessionLength + 60
    if(newSessionLength <= 60 * 60) {
      setSessionLength(newSessionLength)
    }
  }

  const isActive = intervalID !== null

  const handleStartStop = () => {
      // check if timer is active or not
      if(isActive) {
        clearInterval(intervalID)
        setIntervalID(null)
      } else {
        const newIntervalID = setInterval(() => {
          setTimeLeft(prevTimeLeft => prevTimeLeft - 1)
        }, 1000)
        setIntervalID(newIntervalID)
      }
  }

  const handleReset = () => {
    // reset everything
    audioElement.current.load()
    clearInterval(intervalID)
    setIntervalID(null)
    setCurrSessionType('Session')
    setSessionLength(60 * 25)
    setBreakLength(60 * 5)
    setTimeLeft(60 * 25)
  }
  
  return (
    <div className="App">
      <main className="main">
        <h1 className="main-title">Pomodoro Clock</h1>
        <Break
         decrementBreakLength={decrementBreakLength}
         incrementBreakLength={incrementBreakLength}
         breakLength={breakLength}/>
        <Session
         decrementSessionLength={decrementSessionLength}
         incrementSessionLength={incrementSessionLength}
         sessionLength={sessionLength}/>
        <Timer
         timerLabel={currSessionType}
         timeLeft={timeLeft}
         handleStartStop={handleStartStop}
         handleReset={handleReset}
         isActive={isActive}
         audioElement={audioElement}
         />
      </main>
    </div>
  );
}

export default App;
