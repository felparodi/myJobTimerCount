// This component handles the App template used on every page.
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as appAction from '../../actions/appActions';
import MdTimerOn from'react-icons/md/timer';

const { object } = PropTypes;

class ButtonGroup extends Component {
  constructor(props, context) {
    super(props, context);
    this.goTrak = this.goTrak.bind(this);
    this.goSalesforce = this.goSalesforce.bind(this);
  }

  goTrak() {
  	this.props.actions.trakerApp();
  }

  goSalesforce() {
  	this.props.actions.salesforceApp();
  }

  render() {
  	const { goTrak, goSalesforce } = this;
    return (
      <div className='buttoGroup'>
       	<button onClick={goTrak}><MdTimerOn/></button>
       	<button onClick={goSalesforce}>Salefoce</button>
      </div>
    );
  }
}

ButtonGroup.propTypes = {

};

const mapState = (state) => ({ app: state.app });
const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(appAction, dispatch)
  };
};

export default connect(mapState, mapDispatch)(ButtonGroup);
