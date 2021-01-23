import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import './style/pages.css'
import { updateCurrentView, updateUserId, updateModule } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import {Parson, Prolific} from './'
import Curriculum from 'Curriculum/Curriculum.js'
import Learning from 'Components/Learning/Learning.js'


const mapDispatchToProps = {
  onUpdateCurrentView: (id) => updateCurrentView(id),
  onUpdateUserId: (userId) => updateUserId(userId),
  onUpdateModule: (moduleName) => updateModule(moduleName)

};

// const mapDispatchToProps = {
//   onUpdateCode: (code) => updateCode(code),
//   onUpdateCurrentView: (view) => updateCurrentView(view),
//   onProblemComplete: () => problemComplete(),
// };

const mapStateToProps = (state, ownProps) => {
  const moduleName = state.module;
  var pageState = moduleName in state ? state[moduleName] : state
  const currentView = pageState.currentView;
  return { currentView, moduleName};
}

function ManagePages (props) {

    const location = useLocation();
    console.log(location.pathname.replace('/',''))
    var page = location.pathname.replace('/','').charAt(0).toUpperCase() + location.pathname.slice(2)

    props.onUpdateModule(page)

    switch (page) {
      case 'Prolific':
        return <Prolific />
        break;

      case 'Parson':
        return <Parson />
        break;

      default:
        console.log('SHOOT WE ARE HERE')
        return <Prolific />
        break;
    }

    if (props.match.params.userId) {
      // If there is a parameter passed as userId, store it in state, and auto-advance
      props.onUpdateUserId(props.match.params.userId.replace(':userId=',''))
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagePages)
