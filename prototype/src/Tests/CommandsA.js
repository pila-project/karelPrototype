import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'


const WORLD_HEIGHT = 150
  
class CommandsA extends Component {

  renderPreWorld() {
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      stones: [{r:0,c:1,n:1}]
    }
  }

  renderPostWorld() {
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      karelCol:2
    }
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}></h1>
      <KarelCommands
        preWorld={this.renderPreWorld()}
        postWorld = {this.renderPostWorld()}
        hasMove = {true}
        hasTurnLeft = {true}
        hasPickStone = {true}
        hasPlaceStone = {true}
      />
    </div>)
  }

  

}

export default CommandsA