import React from 'react'
import moment from 'moment'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import { IconButton } from '@material-ui/core'

export default function Break({ breakLength, decrementBreakLength, incrementBreakLength }) {
    const breakLengthMinute = moment.duration(breakLength, 's').asMinutes()

    return (
        <div className="length-control">
            <h2 id="break-label">Break Length</h2>
            <IconButton id="break-increment" className="btn" onClick={incrementBreakLength}>
                <ArrowUpwardIcon style={{ fill: 'white' }} />
            </IconButton>
            <div id="break-length">{breakLengthMinute}</div>
            <IconButton id="break-decrement" className="btn" onClick={decrementBreakLength}>
                <ArrowDownwardIcon style={{ fill: 'white' }} />
            </IconButton>
      </div>
    )
}
