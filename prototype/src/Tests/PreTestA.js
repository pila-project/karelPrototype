import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'

const WORLD_WIDTH = 250
  
class PreTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6
    }
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <IdeSingleWorldNoStep
        preWorld = {this.getPreWorld()}

      />
    </div>)
  }

  

}

export default PreTestA