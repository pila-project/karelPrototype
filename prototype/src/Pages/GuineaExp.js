import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style/pages.css'
import Swal from 'sweetalert2'
import Learning from 'Components/Learning/Learning.js'
import Pre from 'Components/Pre/Pre.js'
import Splash from 'Components/Templates/Splash.js'
import { updateCurrentView } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/SimpleCurriculum.js'

import Button from 'react-bootstrap/Button'
import SplitPane from 'react-split-pane'

const mapDispatchToProps = {
  onUpdateCurrentView: (id) => updateCurrentView(id)
};

// const mapDispatchToProps = {
//   onUpdateCode: (code) => updateCode(code),
//   onUpdateCurrentView: (view) => updateCurrentView(view),
//   onProblemComplete: () => problemComplete(),
// };

const mapStateToProps = (state, ownProps) => {
  const savedXml = selectCodeByCurrentView(state);
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState , currentView, savedXml};
}

class Test extends Component {

  constructor(props){
    super(props)
  }

  componentWillMount() {
    document.title = "Pisa 2024";
    let firstView = Curriculum.getPre()[0]
    this.props.onUpdateCurrentView(firstView['id'])
  }

  render() {
    let isPre = Curriculum.isPre(this.props.currentView)
    if(isPre) return <Pre />
    return <Learning />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)