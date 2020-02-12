import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import MovePrompt from 'Img/movePrompt.png'
import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'

const WORLD_SIZE = 250
  
class KarelCommandsMove extends Component {

  componentWillMount() {
  }

  onMoveClick() {
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
          />
        </div>
      </div>
      <div>
        <img 
          src={MovePrompt}
          style={{
            width: 250,
            marginLeft: -270,
            marginRight: 20
          }}
        />
        <Button 
          style={{marginTop:-20}}
          size="lg"
          onClick = {() => this.onMoveClick()}>move
        </Button>
        
      </div>
    </div>)
  }

}

export default KarelCommandsMove