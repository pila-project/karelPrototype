import React, { Component } from 'react';
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button';
import MovePrompt from 'Img/movePrompt.png'
import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import RightTextArrow from 'Components/Util/RightTextArrow.js'
import { connect } from 'react-redux';
import { preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';

const WORLD_SIZE = 250

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};
  
class KarelCommandsMove extends Component {

  componentWillMount() {
  }

  onStepFinished() {
    let goalState = this.refs.goalWorld.getWorldState()
    let postState = this.refs.world.getWorldState()
    let correct = KarelWorld.stateEquals(postState, goalState)
    if(correct) {
      setTimeout(() => this.showCorrect(), 300)
    }
  }

  showCorrect() {
    Swal.fire({
      title: 'Great work!',
      html: 'You solved the puzzle',
      icon: 'success',
      showConfirmButton:false,
      timer: 2500,
      onClose: () => this.props.onPreItemComplete()
    })
  }

  onMoveClick() {
    this.refs.world.setStepCallback(() => this.onStepFinished())
    this.refs.world.move()
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}>Karel can <span className="blue">move</span></h1>
      <div className="horizontal centered" style={{marginBottom:20}}>
        <div>
          <h3>World:</h3>
          <KarelWorld 
            width = {WORLD_SIZE}
            height = {WORLD_SIZE}
            nRows = {2}
            nCols = {2}
            ref="world"
          />
        </div>
        <div style={{width:100}}/>
        <div>
          <h3>Goal:</h3>
          <KarelGoal
            width = {WORLD_SIZE}
            height = {WORLD_SIZE}
            nRows = {2}
            nCols = {2}
            karelCol = {1}
            ref="goalWorld"
          />
        </div>
      </div>
      <div className="horizontal" style={{alignItems:'center'}}>
        <RightTextArrow 
          direction="right"
          text="Click this button to make karel move"
          width={250}
        />
        <Button 
          size="lg"
          onClick = {() => this.onMoveClick()}>move
        </Button>
        
      </div>
    </div>)
  }

}

export default connect(
  null,
  mapDispatchToProps
)(KarelCommandsMove)