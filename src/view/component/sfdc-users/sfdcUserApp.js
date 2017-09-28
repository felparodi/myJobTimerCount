// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as sfdcActions from '../../actions/sfdcActions';
import UserInfo from './userInfo';
import FaUserPluse from 'react-icons/fa/user-plus';
import '../../style/sfdcUsers.scss';
//import Icon from 'react-fa'

class SfdcUserApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.addUser = this.addUser.bind(this);
    this.loadUsers = this.loadUsers.bind(this);
    this.seleceUser = this.seleceUser.bind(this);
  }

  componentDidMount() {
    window.connectionService.subcribe('new-user',this.loadUsers)
    this.loadUsers();
  }

  componentWillUnmount() {
    window.connectionService.unsubcribe('new-user',this.loadUsers)
  }

  loadUsers() {
    const { getUsers } = this.props.actions;
    //getUsers();
  }

  addUser() {
    const { addSfdcUser } = this.props.actions;
    addSfdcUser();
  }

  seleceUser(user) {
    this.props.actions.selectUser(user);
  }

  render() {
    const { addUser, seleceUser } = this;
    const { sfdcUsers, selctedSfcdUser } = this.props;
    const usersRender = sfdcUsers.map( (user) => {
      const selected = (user.id === selctedSfcdUser.id);
      return (<UserInfo user={user} selected={selected} onSelect={seleceUser} />)
    });   
    return (
      <div>
        <div className='actions-bar'>
          <button onClick={addUser} target="_blank">
            <span>Salesforce <FaUserPluse/></span>
          </button>
        </div>
        <div>
          {usersRender}
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
