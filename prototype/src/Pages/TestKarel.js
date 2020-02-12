import React, { Component } from 'react'
import './style/pages.css'
import Swal from 'sweetalert2'
import Splash from '../Components/Templates/Splash.js'

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/NavBars/LearnNav.js'
import SplitPane from 'react-split-pane'

import { CommandsA, CommandsB, PreTestA, PreTestGuessSimple, PreTestGuessWhile, PostTestA } from '../Tests'
import { KarelCommandsMove, KarelCommandsTurnLeft, KarelCommandsPickStone, KarelCommandsPlaceStone } from '../Demos'
import { AnimatedProgram, ProgramsA, ModifyMoves, Learn } from '../Learning'

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