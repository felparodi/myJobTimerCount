import React, { PropTypes } from 'react';
import FaStopCircle from 'react-icons/fa/stop-circle';
import FaPlayCircle from 'react-icons/fa/play-circle';
import MdRemove from 'react-icons/md/highlight-remove';
import MdTimerOn from'react-icons/md/timer';
import MdTimerOff from'react-icons/md/timer-off';


const TimeSubTraker = ({ onStop, onChange, onRemove, trak, sub }) => {

  const { value } = sub;
  const elapsed = Math.round(sub.elapsed / 1000);
  // This will give a number with one digit after the decimal dot (xx.x):
  let seconds = elapsed % 60
  seconds = seconds < 10 ? '0'+seconds : seconds;
  let minute = Math.round(elapsed/60) % 60
  minute = minute < 10 ? '0'+minute : minute;
  const hour = Math.round(elapsed/3600)

  const change = (e) => {
    if (onChange) onChange({ trak:trak, sub:sub.subTrak }, e);
  }

  const stop = () => {
    if (onStop) onStop( { trak:trak, sub:sub.subTrak  } );
  }

  const remove = () => {
    if (onRemove) onRemove( { trak:trak , sub:sub.subTrak });
  }

  return (

      <div className="trak-container">
        <div>
          <span>{ sub.stop ? (<MdTimerOff/>) : (<MdTimerOn/>)} </span>
        </div>
        <div  className="trak-timer">
          <span className="trak-time">
          { hour }:{minute}:{seconds}
          </span>
        </div>
        <div>
          <input type='text'
            className='trak-input-category'
            name='category'
            value={value.category}
            onChange={change}/>
        </div>
        <div>
          <span onClick={stop}> { sub.stop ? (<FaPlayCircle/>) : (<FaStopCircle/>) }</span>
          <span onClick={remove}> <MdRemove/> </span>
        </div>
      </div>
  );
};

export default TimeSubTraker;
