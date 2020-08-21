import React from 'react'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core'

export default function Break({ sessionLength, decrementSessionLength, incrementSessionLength }) {
    return (
        <div className="length-control">
            <h2 id="session-label">Session Length</h2>
            <IconButton id="session-increment" className="btn" onClick={incrementSessionLength}>
                <ArrowUpwardIcon style={{ fill: 'white' }} />
            </IconButton>
            <div id="session-length">{sessionLength}</div>
            <IconButton id="session-decrement" className="btn" onClick={decrementSessionLength}>
                <ArrowDownwardIcon style={{ fill: 'white' }} />
            </IconButton>
        </div>
    )
}
