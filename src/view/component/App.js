// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Home from './home';


const { object } = PropTypes;

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="app-container flex">
        <div className="sidebar"></div>
        <div className="app-body">
          <Home/>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: object
};

const mapState = (state) => ({ user: state.user });

export default connect(mapState)(App);
