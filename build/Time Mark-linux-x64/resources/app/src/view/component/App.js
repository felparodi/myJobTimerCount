// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import TraksApp from './traks';
import SfdcUserApp from './sfdc-users';
import ButtomGroup from './buttonGroup';
import { tickAction } from '../actions/traksActions';


const { object } = PropTypes;

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

 selectApp (app) {
    switch (app) {
      case 'TRAKER': return (<TraksApp/>);
      case 'SFDC-CONNECT': return (<SfdcUserApp/>);
      default: return '';
    }
  }

  render() {
    const { app } = this.props;
    let selectApp = this.selectApp(app);
    return (
      <div className="app-container flex">
        <div className="sidebar">
          <ButtomGroup/>
        </div>
        <div className="app-body">
          {selectApp}
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
