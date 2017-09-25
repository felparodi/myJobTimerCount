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
    const newTraks = traks.concat([createTraker(traks.length)])
    return newTraks;
}

const addSubTrak = (traks, pos) => {
  const newTraks = traks.map((trak) => {
    if (trak.trak === pos.trak) {
      trak.sub = trak.sub.concat([createSubTraker(trak.sub.length)]);
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

const stopTrakHelper  = (trak) => {
  trak.stop = !trak.stop;
  if (trak.stop) {
    trak.count = trak.elapsed
    trak.stops.push({ start: new Date() })
  } else {
    trak.stops[trak.stops.length-1].end =  new Date();
    trak.lastStart = new Date();
  }
  return trak
}

const stopTrak = (traks, pos) => {
  const newTraks = traks.map((trak) => {
    if (trak.trak === pos.trak) {
      if (!pos.sub && pos.sub !== 0) {
        return stopTrakHelper(trak);
      } else {
        trak.sub.map( (subTrak) => {
          if (subTrak.subTrak === pos.sub) return stopTrakHelper(subTrak);

          return subTrak;
        });
      }
    }
    return trak;
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