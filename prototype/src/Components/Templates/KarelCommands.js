import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'

import './style/templates.css'

import { connect } from 'react-redux';
import { preItemComplete } from 'redux/actions';
import { selectCodeByCurrentView } from 'redux/selectors';
import {translate} from 'redux/translator.js'
import {fireSuccessSwal} from 'Components/Util/SuccessSwal.js'

const mapDispatchToProps = {
  onPreItemComplete: () => preItemComplete()
};
  
class KarelCommands extends Component {

  static defaultProps = {
    hasMove: true,
    hasTurnLeft: true,
    hasPickStone: true,
    hasPlaceStone:true
  }

  componentDidMount() {
    this.refs.world.setStepCallback(() => this.onStepFinished())
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
    fireSuccessSwal(() => this.props.onPreItemComplete())
  }

  onMoveClick() {
    this.refs.world.move()
  }

  onMoveClick() {
    this.refs.world.move()
  }

  onTurnClick() {
    this.refs.world.turnLeft()
  }

  onPickClick() {
    this.refs.world.pickStone()
  }

  onPlaceClick() {
    this.refs.world.placeStone()
  }

  renderButtons() {
    const move = translate('move')
    const turnLeft = translate('turnLeft')
    const pickStone = translate('pickStone')
    const placeStone = translate('placeStone')

    var buttons = []
    if(this.props.hasMove) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onMoveClick()}
      >{move}</Button>)
    }
    if(this.props.hasTurnLeft){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onTurnClick()}
      >{turnLeft}</Button>)
    }
    if(this.props.hasPickStone) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onPickClick()}
      >{pickStone}</Button>)
    }
    if(this.props.hasPlaceStone) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onPlaceClick()}
      >{placeStone}</Button>)
    }
    return (<div className="commandButtons">{buttons}</div>)
  }

  render() {
    const world = translate('world')
    const goal = translate('goal')
    return (
      <div className="verticalContainer centered testBody">
        <h1 style={{marginBottom:40,marginTop:40}}>{this.props.title}</h1>
        <div className="horizontal centered">
          <div>
            <h3>{world}:</h3>
            <KarelWorld 
              ref="world" 
              {...this.props.preWorld}
            />
            
          </div>
          <div style={{width:100}}/>
          <div>
            <h3>{goal}:</h3>
            <KarelGoal 
              ref="goalWorld"
              {...this.props.postWorld}
            />
          </div>
        </div>
        <div style={{marginTop:38}}>
          {this.renderButtons()}
        </div>

    </div>)
  }

  

}

export default connect(
  null,
  mapDispatchToProps
)(KarelCommands)