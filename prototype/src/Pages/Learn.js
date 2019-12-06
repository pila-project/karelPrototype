import React, { Component } from 'react';
import './Learn.css';

import Button from 'react-bootstrap/Button';
import LearnNav from '../Components/Learn/LearnNav.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import SplitPane from 'react-split-pane'
import lessonList from '../Lessons/LessonList.js'
import Prediction from '../Lessons/Prediction.js'

class Learn extends Component {

  componentWillMount() {
    document.title = "Pisa 2024";
    this.setState({
      levelIndex:1
    })
  }

  changeLevel(newIndex) {
    this.setState({
      levelIndex:newIndex
    })
  }

  getLesson() {
    let levelName = lessonList[this.state.levelIndex]['name']
    if(levelName == 'Prediction') {
      return <Prediction />
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