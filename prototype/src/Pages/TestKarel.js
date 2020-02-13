import React, { Component } from 'react'
import { connect } from 'react-redux';
import './style/pages.css'
import Swal from 'sweetalert2'
import Splash from '../Components/Templates/Splash.js'
import { getComponentFromId } from '../constants'
import { updateCurrentId } from '../redux/actions';

import Button from 'react-bootstrap/Button'
import LearnNav from '../Components/NavBars/LearnNav.js'
import SplitPane from 'react-split-pane'

const mapDispatchToProps = {
  onUpdateCurrentId: (id) => updateCurrentId(id)
};

var testList = [
  {
    id:'splashNavigation'
  },
  {
    id:'splashMotivation'
  },
  {
    id:'splashPreTestInfo'
  },
  {
    id:'tutorialKarelCommandsMove'
  },
  {
    id:'tutorialKarelCommandsTurnLeft'
  },
  {
    id:'tutorialKarelCommandsPickStone'
  },
  {
    id:'tutorialKarelCommandsPlaceStone'
  },
  {
    id:'tutorialCommandsA'
  },
  {
    id:'tutorialCommandsB'
  },
  {
    id:'splashPreTestGuess'
  },
  {
    id:'preTestGuessSimple'
  },
  {
    id:'preTestGuessWhile'
  },
  {
    id:'tutorialAnimatedProgram'
  },
  {
    name:'First Example',
    type:'lesson',
    id:'tutorialProgramsA'
  },
  {
    name:'B',
    id:'tutorialModifyMoves'
  },
  {
    id:'preTestA'
  },
  {
    id:'splashLearn'
  },
  {
    id:'learnDashboard'
  },
  {
    id:'splashPostTest'
  },
  {
    id:'postTestA'
  },
]

class TestKarel extends Component {

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
    this.props.onUpdateCurrentId(lesson.id);
    return getComponentFromId(lesson.id)
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

export default connect(
  null,
  mapDispatchToProps
)(TestKarel)