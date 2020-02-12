import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getComponentFromId } from '../constants'
import LearnNav from '../Components/NavBars/LearnNav.js'
import { updateCurrentID } from '../redux/actions';

const mapDispatchToProps = {
  onUpdateCurrentID: (id) => updateCurrentID(id)
};

var lessonList = [
  {
    id:'learnModifyB'
  },
  {
    id:'learnModifyC'
  },
  {
    id:'learnTurnRight'
  },
  {
    id:'learnTurnAround'
  },
  {
    id:'learnRepeat5'
  },
  {
    id:'learnRepeatCorners'
  },
  {
    id:'learnRepeat9'
  },
  {
    id:'learnRepeatMethodsA'
  },
  {
    id:'learnRepeatMethodsTest'
  },
]

class Learn extends Component {

  componentWillMount() {
    this.setState({
      levelIndex:0,
      lockedIndex:11
    })
  }

  changeLevel(newLevel) {
    this.setState({
      levelIndex:newLevel
    })
  }

  getLesson() {
    let lesson = lessonList[this.state.levelIndex];
    this.props.onUpdateCurrentID(lesson.id);
    return getComponentFromId(lesson.id);
  }

  render() {
    return (
      <div className="learnContainer">
        <LearnNav 
          levelIndex = {this.state.levelIndex}
          lockedIndex = {this.state.lockedIndex}
          changeLevel = {(e) => this.changeLevel(e)}
          list = {lessonList}
          name = {'Learn'}
          rightText = {'Time left: 45 mins'}
        />
        <div className="learnBody">
          {this.getLesson()}
        </div>
      </div>
    )
  }

}

export default connect(
  null,
  mapDispatchToProps
)(Learn)