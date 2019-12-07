import React, { Component } from 'react'
import './Learn.css'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/Learn/LearnNav.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import SplitPane from 'react-split-pane'
import lessonList from '../Lessons/LessonList.js'

import Intro from '../Lessons/Intro.js'
import Motivation from '../Lessons/Motivation.js'
import KarelCommands from '../Lessons/KarelCommands.js'
import PreTest from '../Lessons/PreTest.js'
import Learning from '../Lessons/Learning.js'
import PostTest from '../Lessons/PostTest.js'
import KarelDemo from '../Lessons/KarelDemo.js'

class Learn extends Component {

  componentWillMount() {
    document.title = "Pisa 2024";
    this.setState({
      levelIndex:3
    })
  }

  changeLevel(newIndex) {
    this.setState({
      levelIndex:newIndex
    })
  }

  // a little inellegant. Switches between lesson names and
  // components
  getLesson() {
    let levelName = lessonList[this.state.levelIndex]['name']
    if(levelName == 'Intro') {
      return <Intro />
    } else if(levelName == 'Motivation') {
      return <Motivation />
    } else if(levelName == 'Karel Commands') {
      return <KarelCommands />
    } else if(levelName == 'Pre Test') {
      return <PreTest />
    } else if(levelName == 'Learning') {
      return <Learning />
    } else if(levelName == 'Post Test') {
      return <PostTest />
    } else if(levelName == 'Karel Demo') {
      return <KarelDemo />
    }
    return <div/>        
  }
 
  render() {

    return (
      <div className="learnContainer">
        <LearnNav 
          levelIndex = {this.state.levelIndex}
          changeLevel = {(e) => this.changeLevel(e)}
        />
        <div className="learnBody">
          {this.getLesson()}
        </div>
      </div>
    )
  }
}

export default Learn