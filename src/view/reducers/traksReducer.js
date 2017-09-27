import * as types from '../actions/actionTypes';
import initialState from './initialState';


const createTraker = (trak) => {
  trak = trak ? trak : 0;
  return { trak:trak, elapsed: 0, start: new Date(), lastStart: new Date(), count: 0, stop: false, stops: [], sub: [], value: {category:''}, trak };
}

const createSubTraker = (subTrak) => {
  subTrak = subTrak ? subTrak : 0;
  return { subTrak, elapsed: 0, start: new Date(), lastStart: new Date(), count: 0, stop: false, stops: [], value: {category:''} }
}

 const addTrak = (traks) => {
    let newTraks = traks.map(stop);
    newTraks = newTraks.concat([createTraker(newTraks.length)])
    return newTraks;
}

const addSubTrak = (traks, pos) => {
  const newTraks = traks.map((trak) => {
    if (trak.trak === pos.trak) {
      let subTraks = trak.sub.map(stop);
      trak.sub = subTraks.concat([createSubTraker(subTraks.length)]);
    }
    return trak;
  });
  return newTraks;
}

const subTrakTick = (sub, i) => {
  sub.subTrak = i
  if (sub.stop) {
    sub.elapsed = sub.count
  } else {
    sub.elapsed = new Date() - sub.lastStart + sub.count
  }
  return sub;
}

const trakTick = (trak, i) => {
  trak.trak = i;
  if (trak.stop) {
    trak.elapsed = trak.count
  } else {
    trak.elapsed = new Date() - trak.lastStart + trak.count
    trak.sub = trak.sub.map(subTrakTick);
  }
  return trak;
}

const tick = (traks) => {
  const newTraks = traks.map(trakTick);
  return newTraks;
}

const valueChange = (traks, pos, e) => {
  console.log(pos, e.target);
  const newTraks = traks.map((trak) => {
    if (trak.trak === pos.trak) {
      if (!pos.sub && pos.sub !== 0) {
        trak.value[e.target.name] = e.target.value;
      } else {
        trak.sub.map((subTrak) => {
         if (subTrak.subTrak === pos.sub) subTrak.value[e.target.name] = e.target.value;
         return subTrak
        });
      }
    }
    return trak;
  });
  return newTraks;
}

const stop = (trak) => {
  if (!trak.stop) {
    trak.stop = true;
    trak.count = trak.elapsed
    trak.stops.push({ start: new Date() })
    if(trak.sub) {
      trak.sub = trak.sub.map(stop);
    }
  }
  return trak;
}
 
const play = (trak) => {
  if (trak.stop) {
    trak.stop = false;
    trak.stops[trak.stops.length-1].end =  new Date();
    trak.lastStart = new Date();
  }
  return trak;
}

const stopOrPlay  = (trak) => {
  if (trak.stop) return play(trak);
  return stop(trak);
}

const stopTrak = (traks, pos) => {
  const newTraks = traks.map((trak) => {
    if (trak.trak === pos.trak) {
      if (!pos.sub && pos.sub !== 0) {
        return stopOrPlay(trak);
      } else {
        let isPlay = !trak.stop;
        trak.sub.map((subTrak) => {
          if (subTrak.subTrak === pos.sub) {
            const ret = stopOrPlay(subTrak);
            isPlay = isPlay || !ret.stop;
            return ret;
          }
          return stop(subTrak);
        });
        return isPlay ? play(trak) : stop(trak);
      }
    }
    return stop(trak);
  });
  return newTraks;
}

const removeTrak = (traks, pos) => {
  const newTraks = [];
  traks.map((trak, i) => {
    if (trak.trak == pos.trak) {
      if (!pos.sub && pos.sub !== 0) return
      const sub = [];
      trak.sub.map((subTrak, j) => {
        if (subTrak.subTrak === pos.sub) return
        subTrak.subTrak = j
        sub.push(subTrak);
      })
      trak.sub = sub;
    }
    trak.trak = i
    newTraks.push(trak);
  })
  return newTraks;
}

const trakReducer = (state = initialState.traks, action) => {
  switch (action.type) {
    case types.ADD_TRAK: return addTrak(state);
    case types.ADD_SUB_TRAK: return addSubTrak(state, action.pos);
    case types.UPDATE_TRAK: return valueChange(state, action.pos, action.e);
    case types.TIME_OUT_TRAKS: return tick(state);
    case types.REMOVE_TRAK: return removeTrak(state, action.pos);
    case types.STOP_TRAK: return stopTrak(state, action.pos);
    default: return state;
  }
};

export default trakReducer;