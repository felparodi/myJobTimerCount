// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FaBeer from 'react-icons/fa/beer';
//import Icon from 'react-fa'

class SfdcUserApp extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { sfdcInfo } = this.props;
    return (
      <div>
        <a href={sfdcInfo.link} target="_blank"><span>Add Salesforce User <FaBeer/></span></a>
      </div>
    );
  }
}

SfdcUserApp.propTypes = {

};

const mapState = (state) => ({ sfdcInfo: state.sfdcInfo });
const mapDispatch = (dispatch) => {
  return {
    actions: {}
  };
};

export default connect(mapState, mapDispatch)(SfdcUserApp);
