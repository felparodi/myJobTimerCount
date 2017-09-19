import React, { PropTypes } from 'react';
import '../../style/TimeTrak.scss';

const TimeTraker = ({ onStop, onChange, onAddSubTrak, onRemove, trak }) => {

  const { value, sub } = trak;
  const elapsed = Math.round(trak.elapsed / 1000);
  // This will give a number with one digit after the decimal dot (xx.x):
  let seconds = elapsed % 60
  seconds = seconds < 10 ? '0'+seconds : seconds;
  let minute = Math.round(elapsed/60) % 60
  minute = minute < 10 ? '0'+minute : minute;
  const hour = Math.round(elapsed/360)

  const change = (e) => {
    if (onChange) onChange(trak.trak, e);
  }
  const stop = () => {
    if (onStop) onStop(trak.trak);
  }

  const addSubTrak = () => {
    if (onAddSubTrak) onAddSubTrak(trak.trak);
  }

  const remove = () => {
    if (onRemove) onRemove(trak.trak);
  }

  const subTraks = sub.map((subTrak) => {
    return (<div> { subTrak.subTrak } {subTrak.elapsed/1000} </div>);
  })
  return (
    <div className='time-traker'>
      <div className="trak-container">
        <div>
          <div className="trak-timer">
            <span className="trak-number">
            { trak.trak }
            </span>
            <span className="trak-time">
          	{ hour }:{minute}:{seconds}
            </span>
          </div>
        
          <button onClick={stop}> { trak.stop ? 'Play' :'Stop' }</button>
          <button onClick={addSubTrak}> Add SubTask </button>
          <button onClick={remove}> Remove </button>
        </div>
        <div>
          <span>Category:</span>
            <input type='text'
                className='trak-input-category'
                name='category'
                value={value.category}
                onChange={change}/>
          <span>Estimate(Hours):</span>
          <input type='number'
                className='trak-input'
                name='estimate'
                value={value.estimate}
                onChange={change}/>
        </div>
      </div>
      <div className='sub-task'>
        <div className='tab'></div>
        <div>
        { subTraks }
        </div>
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
