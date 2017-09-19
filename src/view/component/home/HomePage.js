// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import TimeTrak from './TimeTrak';

const domain = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code';
const consumerKey = '3MVG9g9rbsTkKnAXZhoZl0X94zw4LamYVowluBzxqgeaqBqgFBCjUx.gguCrM5z5qWpzjnJ1wqCw8KJPNZDx4';
const callback = 'http://localhost:37259/aouth/sforce';
const callbackEncode = encodeURIComponent(callback);
const link = `${domain}&client_id=${consumerKey}&redirect_uri=${callbackEncode}`;

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { traks: [ this.createTraker() ] }
    this.tick = this.tick.bind(this);
    this.addTrak = this.addTrak.bind(this);
    this.onChange = this.onChange.bind(this);
    this.stopTrak = this.stopTrak.bind(this);
    this.addSubTrak = this.addSubTrak.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onSave() {
    console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping')); 
    // Async message handler
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg);
    });
    // Async message sender
    ipcRenderer.send('asynchronous-message', 'async ping');
  }

  createTraker(trak) {
    trak = trak ? trak : 0;
    return { trak:trak, elapsed: 0, start: new Date(), lastStart: new Date(), count: 0, stop: false, stops: [], sub: [], value: {}, trak };
   }

  createSubTraker(subTrak) {
    subTrak = subTrak ? subTrak : 0;
    return { subTrak, elapsed: 0, start: new Date(), lastStart: new Date(), count: 0, stop: false, stops: [], value: {} }
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 50);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  addTrak() {
    const { traks } = this.state

    const newTraks = traks.concat([this.createTraker(traks.length)])
    this.setState({ traks : newTraks });
  }

  addSubTrak(pos) {
    let { traks } = this.state;
    const newTraks = traks.map((trak, i) => {
      if (trak.trak === pos) {
        trak.sub = trak.sub.concat([this.createSubTraker(trak.sub.length)]);
      }
      return trak;
    });
    this.setState({ traks: newTraks });
  }

  stopTrak(pos, sub) {
    let { traks } = this.state;
    const newTraks = traks.map((trak, i) => {
      if (trak.trak === pos) {
        trak.stop = !trak.stop
        if (trak.stop) {
          trak.count = trak.count + trak.elapsed
          trak.stops.push({ start: new Date() })
        } else {
          trak.stops[trak.stops.length-1].end =  new Date();
          trak.lastStart = new Date();
        }
      }
      return trak;
    });
    this.setState({ traks: newTraks });
  }

  tick() {
    const { traks } = this.state
    const newTraks = traks.map((trak, i) => {
      trak.trak = i;
      if (trak.stop) {
        trak.elapsed = trak.count
      } else {
        trak.elapsed = new Date() - trak.lastStart + trak.count
        trak.sub = trak.sub.map((sub, j) => {
          sub.subTrak = j
          if (sub.stop) {
            sub.elapsed = sub.count
          } else {
            sub.elapsed = new Date() - sub.lastStart + sub.count
          }
          return sub;
        });
      }
      return trak;
    });
    this.setState({ traks:newTraks });
  }

  onChange(pos, e) {
    let { traks } = this.state;
    const newTraks = traks.map((trak, i) => {
      if (trak.trak === pos) {
        trak.value[e.target.name] = e.target.value;
      }
      return trak;
    });

    this.setState({ traks: newTraks });
  }

  onRemove(pos) {
    const { traks } = this.state;
    const newTraks = [];
    traks.map((trak) => {
      if (trak.trak == pos) return;
      newTraks.push(trak);
    })
    this.setState({ traks: newTraks })
  }

  render() {
    const { traks } = this.state
    const { addTrak, onChange, stopTrak, addSubTrak } = this
    const traksRender = traks.map( (trak, i) => {
      return (<TimeTrak trak={trak}
                onChange={onChange}
                onStop={stopTrak}
                onAddSubTrak={addSubTrak}/>)
    });   
    return (
      <div>
      	<button onClick={addTrak}>
          Add Trak
        </button>
        <div>
        {traksRender}
        </div>
      
      </div>
    );
  }
}

HomePage.propTypes = {

};

const mapState = (state) => ({ user: state.user });

export default connect(mapState)(HomePage);
