import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Dashboard from '../Dashboard/Dashboard.js'
import DashboardItem from '../Dashboard/DashboardItem.js'
import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";
import {RepeatL3Dash5, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState, currentView };
}

class Learning extends Component {

  render() {
    if(this.props.currentView === 'dashboard') {
      return <Dashboard />
    } else {
      // change this to redux
      return <DashboardItem />
    }
  }

}

export default connect(
  mapStateToProps,
  null
)(Learning)
