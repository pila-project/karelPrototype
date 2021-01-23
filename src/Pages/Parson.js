import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style/pages.css'
import Swal from 'sweetalert2'
import Learning from 'Components/Learning/Learning.js'
import Pre from 'Components/Pre/Pre.js'
import Post from 'Components/Post/Post.js'
import Splash from 'Components/Templates/Splash.js'
import { updateCurrentView, updateUserId, updateModule } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import Curriculum from 'Curriculum/Curriculum.js'

import Button from 'react-bootstrap/Button'
import SplitPane from 'react-split-pane'

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
  const savedXml = selectCodeByCurrentView(state);
  const studentState = state.studentState;
  const currentView = state.currentView;
  return { studentState , currentView, savedXml};
}

class Test extends Component {

  constructor(props){
    super(props)
    this.moduleName = 'Parson'
    this.props.onUpdateModule(this.moduleName)

  }

  componentWillMount() {
    document.title = "Pisa 2024";

    this.LearnModule = new Curriculum(this.moduleName)

    if (!this.props.currentView) {
      let firstView = this.LearnModule.getCollection('pre')[0]
      this.props.onUpdateCurrentView(firstView['id'])
    } else {
      this.props.onUpdateCurrentView(this.props.currentView)
    }

    if (this.props.match.params.userId) {
      // If there is a parameter passed as userId, store it in state, and auto-advance
      this.props.onUpdateUserId(this.props.match.params.userId.replace(':userId=',''))
    }
  }

  render() {
    let isPre = this.LearnModule.isPre(this.props.currentView)
    let isPost = this.LearnModule.isPost(this.props.currentView)
    if(isPre) return <Pre />
    if(isPost) return <Post />
    return <Learning />
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Test)
