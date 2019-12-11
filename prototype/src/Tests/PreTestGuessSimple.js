import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import CodeSimple from '../Img/codeSimple.png'

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'
import GuessPost from '../Components/Templates/GuessPost.js'

const WORLD_WIDTH = 180
  
class PreTestGuessSimple extends Component {

  getInitWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
    }
  }

  getWorldA() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
      karelCol:1,
      karelDir:'North'
    }
  }

  getWorldB() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
      karelRow:0,
      karelCol:1,
      karelDir:'North'
    }
  }

  getWorldC() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
      karelRow:0,
      karelCol:1,
      karelDir:'North',
      stones:[{r:0,c:1,n:1}]
    }
  }

  getWorldD() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
      karelRow:0,
    }
  }

  getWorldE() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:2,
      nCols:2,
      karelRow:0,
      stones:[{r:0,c:1,n:1}]
    }
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <GuessPost
        img = {CodeSimple}
        world={this.getInitWorld()}
        a={this.getWorldA()}
        b={this.getWorldB()}
        c={this.getWorldC()}
        d={this.getWorldD()}
        e={this.getWorldE()}
      />
    </div>)
  }

  

}

export default PreTestGuessSimple