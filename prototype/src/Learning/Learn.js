import React, { Component } from 'react'

import LearnNav from '../Components/NavBars/LearnNav.js'
import ProgramsA from './ProgramsA.js'
import ModifyMoves from './ModifyMoves.js'
import ModifyB from './ModifyB.js'
import ModifyC from './ModifyC.js'
import FnTurnRight from './FnTurnRight.js'
import FnTurnAround from './FnTurnAround.js'
import Repeat5 from './Repeat5.js'
import Repeat9 from './Repeat9.js'
import RepeatCorners from './RepeatCorners.js'
import RepeatMethodsA from './RepeatMethodsA.js'
import RepeatMethodsTest from './RepeatMethodsTest.js'
import AnimatedProgram from './AnimatedProgram.js'

var lessonList = [
  {
    name:'C',
    render:<ModifyB />
  },
  {
    name:'D',
    render:<ModifyC />
  },
  {
    name:'Turn Right',
    render:<FnTurnRight />
  },
  {
    name:'Turn Around',
    render:<FnTurnAround />
  },
  {
    name:'Repeat 5',
    render:<Repeat5 />
  },
  {
    name:'Repeat Corners',
    render:<RepeatCorners />
  },
  {
    name:'Repeat 9',
    render:<Repeat9 />
  },
  {
    name:'Repeat Methods',
    render:<RepeatMethodsA />
  },
  {
    name:'Repeat Test',
    render:<RepeatMethodsTest />
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
    let lesson = lessonList[this.state.levelIndex]
    return lesson['render']      
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

export default Learn