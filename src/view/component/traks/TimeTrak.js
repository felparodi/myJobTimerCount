import React, { PropTypes } from 'react';
import '../../style/TimeTrak.scss';
import TimeSubTrak from './TimeSubTrak';
import FaStopCircle from 'react-icons/fa/stop-circle';
import FaPlayCircle from 'react-icons/fa/play-circle';
import MdAlarmAdd from 'react-icons/md/alarm-add';
import MdRemove from 'react-icons/md/highlight-remove';
import MdTimerOn from'react-icons/md/timer';
import MdTimerOff from'react-icons/md/timer-off';


const TimeTraker = ({ onStop, onChange, onAddSubTrak, onRemove, trak }) => {

  const { value, sub } = trak;
  const elapsed = Math.round(trak.elapsed / 1000);
  // This will give a number with one digit after the decimal dot (xx.x):
  let seconds = elapsed % 60
  seconds = seconds < 10 ? '0'+seconds : seconds;
  let minute = Math.round(elapsed/60) % 60
  minute = minute < 10 ? '0'+minute : minute;
  const hour = Math.round(elapsed/3600)

  const change = (e) => {
    if (onChange) onChange({ trak:trak.trak }, e);
  }
  const stop = () => {
    if (onStop) onStop( { trak: trak.trak } );
  }

  const addSubTrak = () => {
    if (onAddSubTrak) onAddSubTrak({ trak:trak.trak });
  }

  const remove = () => {
    if (onRemove) onRemove( { trak: trak.trak });
  }

  const subTraks = sub.map((subTrak) => {
    return (<TimeSubTrak sub={subTrak}  onChange={onChange} onStop={onStop} onRemove={onRemove} trak={trak.trak}/>);
  })
  return (
    <div className='time-traker'>
      <div className="trak-container">
        <div>
          <span>{ trak.stop ? (<MdTimerOff size={30}/>) : (<MdTimerOn size={30}/>)} </span>
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
          <span onClick={stop}> { trak.stop ? (<FaPlayCircle/>) : (<FaStopCircle/>) }</span>
          <span onClick={addSubTrak}> <MdAlarmAdd/> </span>
          <span onClick={remove}> <MdRemove/> </span>
        </div>
      </div>
      <div className='sub-task'>
        { subTraks }
      </div>
    </div>
  );
};

const { string, func, bool } = PropTypes;

TimeTraker.propTypes = {
  name: string.isRequired,
  onChange: func,
  value: string,
  error: string,
  disabled: bool
};

export default TimeTraker;
