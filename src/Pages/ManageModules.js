import React, { Component } from 'react'
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';
import './style/pages.css'
import { updateCurrentView, updateUserId, updateModule } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import {Parson, Prolific, MultipleWorlds, LearnExperience, Tutorial, Experience1, Experience2} from './'
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

function ManageModules (props) {

    const location = useLocation();
    var newModule = location.pathname.split(':')[0].replaceAll('/','')
    newModule = newModule.charAt(0).toUpperCase() + newModule.slice(1)

    props.onUpdateModule(newModule)

    //var userId = null;
    //if (props.match.params.userId) {
      // If there is a parameter passed as userId, store it in state, and auto-advance
      //props.onUpdateUserId(props.match.params.userId.replace(':userId=',''))
    //  userId = props.match.params.userId.replace(':userId=','')
    //}

    return <LearnExperience />

    /*
    switch (newModule) {

      case 'Prolific':
        return <Prolific />
        break;

      case 'Parson':
        return <Parson />
        break;

      case 'MultipleWorlds':
        return <MultipleWorlds />
        break;

      default:
        return <Prolific />
        break;
    }
    */
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageModules)
