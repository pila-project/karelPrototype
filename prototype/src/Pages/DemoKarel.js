import React, { Component } from 'react'
import './style/pages.css'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/NavBars/LearnNav.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import SplitPane from 'react-split-pane'
import demoList from '../Demos/DemoList.js'

class Demos extends Component {

  componentWillMount() {
    document.title = "Pisa 2024";
    this.setState({
      levelIndex:0
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
    let lesson = demoList[this.state.levelIndex]
    return lesson['render']      
  }
 
  render() {

    return (
      <div className="learnContainer">
        <LearnNav 
          levelIndex = {this.state.levelIndex}
          changeLevel = {(e) => this.changeLevel(e)}
          list = {demoList}
          name = {'Pisa 2024'}
        />
        <div className="learnBody" style={{marginTop:40}}>
          {this.getLesson()}
        </div>
      </div>
    )
  }
}

export default Demos