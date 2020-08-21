import React, { useState, useEffect, useRef } from 'react';
import './styles.css'

import Break from './components/Break'
import Session from './components/Session'
import Timer from './components/Timer'
import { useInterval } from './Hooks'

function App() {
  const audioElement = useRef(null)
  const [breakLength, setBreakLength] = useState(5)
  const [sessionLength, setSessionLength] = useState(25)
  const [currSessionType, setCurrSessionType] = useState('Session')
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60 * 1000)
  const [active, setActive] = useState(false)

  // dynamically change time left
  useEffect(() => {
    setTimeLeft(sessionLength * 60 * 1000)
  }, [sessionLength])

  // listen to time left 
  useEffect(() => {
    if(timeLeft === 0 && currSessionType === 'Session') {
      audioElement.current.play()
      setCurrSessionType('Break')
      setTimeLeft(breakLength * 60 * 1000)
    } else if(timeLeft === 0 && currSessionType === 'Break') {
        setCurrSessionType('Session')
        setTimeLeft(sessionLength * 60 * 1000)
      }
    }, [breakLength, currSessionType, sessionLength, timeLeft])

  useInterval(() => setTimeLeft(timeLeft - 1000), active ? 1000 : null)

  const decrementBreakLength = () => {
    if(breakLength === 1) {
      return null
    } else {
      setBreakLength(breakLength - 1)
    }
  }
  
  const incrementBreakLength = () => {
    if(breakLength >= 60) {
      return null
    } else {
      setBreakLength(breakLength + 1)
    }
  }
  
  const decrementSessionLength = () => {
    if(sessionLength === 1) {
      return null
    } else {
      setSessionLength(sessionLength - 1)
    }
  }

  const incrementSessionLength = () => {
    if(sessionLength >= 60) {
      return null
    } else {
      setSessionLength(sessionLength + 1)
    }
  }

  const handleReset = () => {
    // reset everything
    audioElement.current.pause()
    audioElement.current.load()
    setCurrSessionType('Session')
    setSessionLength(25)
    setBreakLength(5)
    setTimeLeft(25 * 60 * 1000)
    setActive(false)
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
         handleReset={handleReset}
         isActive={[active, setActive]}
         audioElement={audioElement}
         />
      </main>
    </div>
  );
}

export default App;
