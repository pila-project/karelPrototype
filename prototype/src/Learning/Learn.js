import React, { Component } from 'react'

import LearnNav from '../Components/Learn/LearnNav.js'


var lessonList = [
  {
    name:'A',
    type:'Learn',
    render:<div>A</div>,
  },
  {
    name:'B',
    render:<div>B</div>
  },
  {
    name:'C',
    render:<div>B</div>
  },
]

class Learn extends Component {

  componentWillMount() {
    this.setState({
      levelIndex:0,
      unlockedIndex:2
    })
  }

  changeLevel(newLevel) {
    this.setState({
      levelIndex:newLevel
    })
  }

  getLesson() {
    let lesson = lessonList[this.state.levelIndex]
    return lesson['render']      
  }

  render() {
    return (
      <div className="learnContainer">
        <LearnNav 
          levelIndex = {this.state.levelIndex}
          changeLevel = {(e) => this.changeLevel(e)}
          list = {lessonList}
          name = {'Learn'}
          rightText = {'Time left: 60 mins'}
        />
        <div className="learnBody">
          {this.getLesson()}
        </div>
      </div>
    )
  }

}

export default Learn