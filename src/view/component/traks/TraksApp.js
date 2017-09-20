// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as traksAction from '../../actions/traksActions';
import TimeTrak from './TimeTrak';

const domain = 'https://login.salesforce.com/services/oauth2/authorize?response_type=code';
const consumerKey = '3MVG9g9rbsTkKnAXZhoZl0X94zw4LamYVowluBzxqgeaqBqgFBCjUx.gguCrM5z5qWpzjnJ1wqCw8KJPNZDx4';
const callback = 'http://localhost:37259/aouth/sforce';
const callbackEncode = encodeURIComponent(callback);
const link = `${domain}&client_id=${consumerKey}&redirect_uri=${callbackEncode}`;

class TraksApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.addTrak = this.addTrak.bind(this);
   
  }

  addTrak() {
    this.props.actions.addTrak();
  }

  render() {
    const { traks } = this.props
    const { addTrak } = this
    const traksRender = traks.map( (trak, i) => {
      return (<TimeTrak trak={trak}/>)
    });   
    return (
      <div>
      	<button onClick={addTrak}>
          Add Trak
        </button>
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
