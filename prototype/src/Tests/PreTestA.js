import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'

const WORLD_HEIGHT = 150
  
class PreTestA extends Component {

  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}>Hello world</h1>
      <IdeSingleWorldNoStep/>
    </div>)
  }

  

}

export default PreTestA