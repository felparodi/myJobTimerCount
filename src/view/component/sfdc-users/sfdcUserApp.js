// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FaBeer from 'react-icons/fa/beer';
import * as sfdcActions from '../../actions/sfdcActions';
//import Icon from 'react-fa'

class SfdcUserApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.addUser = this.addUser.bind(this);
  }

  addUser() {
    const { addSfdcUser } = this.props.actions
    addSfdcUser();
  }

  render() {
    const { addUser } = this;
    return (
      <div>
        <button onClick={addUser} target="_blank"><span>Add Salesforce User <FaBeer/></span></button>
      </div>
    );
  }
}

SfdcUserApp.propTypes = {

};

const mapState = (state) => ({});
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sfdcActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(SfdcUserApp);
