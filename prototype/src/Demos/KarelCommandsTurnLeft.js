import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'


const WORLD_SIZE = 250
  
class KarelCommandsTurnLeft extends Component {

  componentWillMount() {
  }

  onMoveClick() {
    this.refs.world.move()
  }

  onTurnClick() {
    this.refs.world.turnLeft()
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}>Karel can <span style={{color:'blue'}}>turn left</span></h1>
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
            karelDir = {'North'}
          />
        </div>
      </div>
      <div style={{marginTop:18}}>
         <Button 
            size="lg" 
            onClick = {() => this.onTurnClick()}
          >turn left</Button>
      </div>
    </div>)
  }

  

}

export default KarelCommandsTurnLeft