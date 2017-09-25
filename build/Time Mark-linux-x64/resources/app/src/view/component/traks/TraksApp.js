// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traksAction from '../../actions/traksActions';
import TimeTrak from './TimeTrak';

class TraksApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.addTrak = this.addTrak.bind(this);
    this.tick = this.tick.bind(this);
    this.addSubTark = this.addSubTark.bind(this);
    this.stopTrak = this.stopTrak.bind(this);
    this.removeTrak = this.removeTrak.bind(this);
    this.updateTrak = this.updateTrak.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.props.actions.tick();
  }

  addTrak() {
    this.props.actions.addTrak();
  }

  addSubTark(pos) {
    this.props.actions.addSubTrak(pos);
  }

  stopTrak(pos) {
    this.props.actions.stopTrak(pos);
  }

  removeTrak(pos) {
    console.log('remove', pos);
    this.props.actions.removeTrak(pos);
  }

  updateTrak(pos, e) {
    this.props.actions.updateTrak(pos, e);
  }

  render() {
    const { traks } = this.props
    const { addTrak, stopTrak, addSubTark, removeTrak, updateTrak } = this
    const traksRender = traks.map( (trak, i) => {
      return (<TimeTrak onStop={stopTrak} onChange={updateTrak} onAddSubTrak={addSubTark} onRemove={removeTrak} trak={trak}/>)
    });   
    return (
      <div>
        <div className='actions-bar'>
        	<button onClick={addTrak}>
            Add Trak
          </button>
        </div>
        <div>
        {traksRender}
        </div>
      </div>
    );
  }
}

TraksApp.propTypes = {

};

const mapState = (state) => ({ traks: state.traks });
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(traksAction, dispatch)
  };
};

export default connect(mapState, mapDispatch)(TraksApp);
