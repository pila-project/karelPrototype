import React, { Component } from 'react'
import './Learn.css'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/Learn/LearnNav.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import SplitPane from 'react-split-pane'

import Splash from '../Components/Test/Splash.js'
import Intro from '../Lessons/Intro.js'
import Motivation from '../Lessons/Motivation.js'
import KarelCommands from '../Lessons/KarelCommands.js'
import KarelCommandsMove from '../Lessons/KarelCommandsMove.js'
import KarelCommandsPickStone from '../Lessons/KarelCommandsPickStone.js'
import KarelCommandsPlaceStone from '../Lessons/KarelCommandsPlaceStone.js'
import KarelCommandsTurnLeft from '../Lessons/KarelCommandsTurnLeft.js'
import PreTest from '../Lessons/PreTest.js'
import Learning from '../Lessons/Learning.js'
import PostTest from '../Lessons/PostTest.js'
import DemoBlocks from '../Lessons/DemoBlocks.js'
import DemoPrePostIde from '../Lessons/DemoPrePostIde.js'
import DemoMultipleTests from '../Lessons/DemoMultipleTests.js'
import DemoMultipleTests2 from '../Lessons/DemoMultipleTests2.js'
import DemoMultipleTests3 from '../Lessons/DemoMultipleTests3.js'

var testList = [
  {
    render:<Splash text={'Prototype'}/>
  },
  {
    render:<Splash text={'Pre Test'}/>
  },
  {
    name:'KarelCommandsMove',
    render:<KarelCommandsMove />
  },
  {
    name:'KarelCommandsTurnLeft',
    render:<KarelCommandsTurnLeft />
  },
  {
    name:'KarelCommandsPlaceStone',
    render:<KarelCommandsPlaceStone />
  },
  {
    name:'KarelCommandsPickStone',
    render:<KarelCommandsPickStone />
  }
]

class Test extends Component {

  constructor(props){
    super(props)
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    document.title = "Pisa 2024";
    this.setState({
      levelIndex:0
    })
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  changeLevel(newIndex) {
    this.setState({
      levelIndex:newIndex
    })
  }

  // a little inellegant. Switches between lesson names and
  // components
  getLesson() {
    let lesson = testList[this.state.levelIndex]
    return lesson['render']      
  }

  handleKeyPress(e) {
    let key = e.key
    if(key == 'ArrowLeft') {
      this.setState(function(prevState){
        if(prevState.levelIndex > 0) {
          return {levelIndex: prevState.levelIndex-1}
        }
      })
    }
    if(key == 'ArrowRight') {
      this.setState(function(prevState){
        if(prevState.levelIndex < testList.length -1){
          return {levelIndex: prevState.levelIndex+1}
        }
      })
    }
  }
 
  render() {

    return (
      <div onKeyPress={this.handleKeyPress} >
        {this.getLesson()}
      </div>
    )
  }
}

export default Test