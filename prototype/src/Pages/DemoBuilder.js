import React, { Component } from 'react'
import './style/pages.css'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/NavBars/LearnNav.js'
import SplitPane from 'react-split-pane'

import Splash from '../Components/Templates/Splash.js'

import DemoBuilderIde from '../Demos/DemoBuilder/DemoBuilderIde.js'
import DemoBuilderCommands from '../Demos/DemoBuilder/DemoBuilderCommands.js'

var demoList = [
  {
    name:'Demo Builder',
    render:<Splash text={"Demo Builder"}/>
  },
  {
    name:'Demo Builder',
    render:<DemoBuilderCommands />
  },
  {
    name:'Demo Builder',
    render:<DemoBuilderIde />
  },
  
]

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
        <div className="learnBody">
          {this.getLesson()}
        </div>
      </div>
    )
  }
}

export default Demos