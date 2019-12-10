import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Karel/KarelWorld.js'
import KarelGoal from '../Karel/KarelGoal.js'

import './style/templates.css'

const WORLD_SIZE = 150
  
class KarelCommandsPlaceStone extends Component {

  componentWillMount() {
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
    var buttons = []
    if(this.props.hasMove) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onMoveClick()}
      >move</Button>)
    }
    if(this.props.hasTurnLeft){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onTurnClick()}
      >turn left</Button>)
    }
    if(this.props.hasPickStone) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onPickClick()}
      >pick stone</Button>)
    }
    if(this.props.hasPlaceStone) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        onClick = {() => this.onPlaceClick()}
      >place stone</Button>)
    }
    return (<div className="commandButtons">{buttons}</div>)
  }

  render() {
    return (<div className="vertical centered">
      <div className="horizontal centered">
        <div>
          <h3>World:</h3>
          <KarelWorld ref="world" {...this.props.preWorld}/>
          
        </div>
        <div style={{width:100}}/>
        <div>
          <h3>Goal:</h3>
          <KarelGoal {...this.props.postWorld}/>
        </div>
      </div>
      <div style={{marginTop:38}}>
        {this.renderButtons()}
      </div>
    </div>)
  }

  

}

export default KarelCommandsPlaceStone