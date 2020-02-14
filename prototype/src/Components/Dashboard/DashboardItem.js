import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { updateCurrentId } from 'redux/actions';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";
import {RepeatL3Dash5, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  const learningView = state.currentLearningView;
  return { studentState , learningView };
}

const mapDispatchToProps = {
  onUpdateCurrentId: (id) => updateCurrentId(id)
};

class DashboardItem extends Component {

  constructor(props){
    super(props);
    this.props.onUpdateCurrentId('dashboardItem');
  }

  componentWillMount(){
    document.title = "PISA 2024 Learn";
  }
  
  static defaultProps = {
    itemId: 'MethodsRightAround'
  }

  render() {

    return (
      <div style={{width:'100vw', height:'100vh'}}>
        {Curriculum.getComponent(this.props.learningView)}
      </div>
    )
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardItem)
