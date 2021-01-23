import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/Curriculum.js'
import Logo from "Img/pisa.jpeg";
import {RepeatL3Dash5, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module;
  var pageState = state[moduleName];
  const studentState = pageState.studentState;
  const currentView = pageState.currentView;
  return { studentState , currentView, moduleName };
}

class DashboardItem extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Learn";
    this.LearnModule = new Curriculum(this.props.moduleName)
  }

  render() {
    return (
      <div style={{width:'100vw', height:'100vh'}}>
        {this.LearnModule.getComponent(this.props.currentView)}
      </div>
    )
  }

}

export default connect(
  mapStateToProps,
  null
)(DashboardItem)
