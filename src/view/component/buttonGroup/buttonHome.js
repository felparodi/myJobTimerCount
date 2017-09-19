// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as buttonAction from '../../actions/buttonAction';

const { object } = PropTypes;

class ButtonHome extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
     	HOME
      </div>
    );
  }
}

ButtonHome.propTypes = {
  actions: object.isRequired
};

const mapState = (state) => {
  return {};
};


const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(buttonAction, dispatch)
  };
};

export default connect(mapState, mapDispatch)(ButtonHome);
