// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TraksApp from './traks';
import { tickAction } from '../actions/traksActions';

const { object } = PropTypes;

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  tick() {
    this.props.tick()
  }


  render() {
    const { app } = this.props
    return (
      <div className="app-container flex">
        <div className="sidebar"></div>
        <div className="app-body">
          <TraksApp/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  app: object
};

const mapState = (state) => ({ app: state.app });

const mapDispatch = (dispatch) => {
  return {
    tick: () => dispatch(tickAction())
  };
};

export default connect(mapState, mapDispatch)(App);
