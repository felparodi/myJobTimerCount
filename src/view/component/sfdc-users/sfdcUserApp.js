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

  componentDidMount() {
    window.connectionService.subcribe('new-user',this.loadUsers)
    this.loadUsers();
  }

  componentWillUnmount() {
    window.connectionService.unsubcribe('new-user',this.loadUsers)
  }

  loadUsers() {

  }

  addUser() {
    const { addSfdcUser } = this.props.actions
    addSfdcUser();
  }

  render() {
    const { addUser } = this;
    return (
      <div>
        <div className='actions-bar'>
          <button onClick={addUser} target="_blank">
            <span>Add Salesforce User <FaBeer/></span>
          </button>
        </div>
        <div>

        </div>
      </div>
    );
  }
}

SfdcUserApp.propTypes = {

};

const mapState = (state) => ({ sfdcUsers: state.sfdcUsers, selctedSfcdUser: state.selctedSfcdUser});
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(sfdcActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(SfdcUserApp);
