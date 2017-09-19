// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

const { object } = PropTypes;

class ButtonGroup extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
     
      </div>
    );
  }
}

ButtonGroup.propTypes = {

};

const mapState = (state) => ({ user: state.user });

export default connect(mapState)(ButtonGroup);
