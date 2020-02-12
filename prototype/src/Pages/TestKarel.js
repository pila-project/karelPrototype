import React, { Component } from 'react'
import './style/pages.css'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/NavBars/LearnNav.js'
import SplitPane from 'react-split-pane'

import Swal from 'sweetalert2'

import Splash from '../Components/Templates/Splash.js'
import KarelCommandsMove from '../Demos/KarelCommandsMove.js'
import KarelCommandsPickStone from '../Demos/KarelCommandsPickStone.js'
import KarelCommandsPlaceStone from '../Demos/KarelCommandsPlaceStone.js'
import KarelCommandsTurnLeft from '../Demos/KarelCommandsTurnLeft.js'

import CommandsA from '../Tests/CommandsA.js'
import CommandsB from '../Tests/CommandsB.js'

import PreTestA from '../Tests/PreTestA.js'
import PreTestGuessSimple from '../Tests/PreTestGuessSimple.js'
import PreTestGuessWhile from '../Tests/PreTestGuessWhile.js'

import PostTestA from '../Tests/PostTestA.js'
import ProgramDemoA from '../Learning/ProgramsA.js'

import ProgramsA from '../Learning/ProgramsA.js'
import ModifyMoves from '../Learning/ModifyMoves.js'
import ModifyB from '../Learning/ModifyB.js'
import ModifyC from '../Learning/ModifyC.js'
import FnTurnRight from '../Learning/FnTurnRight.js'
import FnTurnAround from '../Learning/FnTurnAround.js'
import Repeat5 from '../Learning/Repeat5.js'
import Repeat9 from '../Learning/Repeat9.js'
import RepeatCorners from '../Learning/RepeatCorners.js'
import RepeatMethodsA from '../Learning/RepeatMethodsA.js'
import RepeatMethodsTest from '../Learning/RepeatMethodsTest.js'
import AnimatedProgram from '../Learning/AnimatedProgram.js'

import Learn from '../Learning/Learn.js'

var testList = [
  {
    render:<Splash text={'Prototype'} subText={'(use <- and ->)'}/>
  },
  {
    render:<Splash text={'Motivation!'} subText={'In this experience you are going to be learning! Everyone will succeed. Coding is important'}/>
  },
  {
    render:<Splash text={'PreTest: Context + Knowledge'} subText={'We teach students how to use the UI and test both their comfort in the environment and their prior control flow.'}/>
  },
  {
    render:<KarelCommandsMove />
  },
  {
    render:<KarelCommandsTurnLeft />
  },
  {
    render:<KarelCommandsPickStone />
  },
  {
    render:<KarelCommandsPlaceStone />
  },
  {
    render:<CommandsA />
  },
  {
    render:<CommandsB />
  },
  {
    render:<Splash text={'Pre Test'} subText={"Make your best guess"}/>
  },
  {
    render:<PreTestGuessSimple />
  },
  {
    render:<PreTestGuessWhile />
  },
  {
    render:<AnimatedProgram />,
  },
  {
    name:'First Example',
    type:'lesson',
    render:<ProgramsA />,
  },
  {
    name:'B',
    render:<ModifyMoves/>
  },
  {
    render:<PreTestA />
  },
  {
    render:<Splash text={'Learning'} subText={"Let's learn how to program!"}/>
  },
  {
    render:<Learn />
  },
  {
    render:<Splash text={'Post Test'} subText={"Lets celebrate"}/>
  },
  {
    render:<PostTestA />
  },
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

  previousLesson() {
    this.setState(function(prevState){
      if(prevState.levelIndex > 0) {
        return {levelIndex: prevState.levelIndex-1}
      }
    })
  }

  nextLesson() {
    this.setState(function(prevState){
      if(prevState.levelIndex < testList.length -1){
        return {levelIndex: prevState.levelIndex+1}
      }
    })
  }

  motivation() {
    let options = [
      'Great work',
      'Amazing',
      'Wonderful',
      'Awesome',
      'How cool',
      'You are really learning'
    ]
    return options[Math.floor(Math.random() * options.length)];
  }

  handleKeyPress(e) {
    let key = e.key
    if(key == 'ArrowLeft') {
      this.previousLesson()
    }
    if(key == 'ArrowRight') {
      this.nextLesson()
    }
    if(key == 'ArrowUp') {
      Swal.fire({
        title: this.motivation() + '!',
        html: 'You solved the puzzle',
        icon: 'success',
        showConfirmButton:false,
        timer: 1500,
        onClose: () => this.nextLesson()
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