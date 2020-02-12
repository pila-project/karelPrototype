import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import CodeWhile from '../Img/codeWhile.png'

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'
import GuessPost from '../Components/Templates/GuessPost.js'

const WORLD_WIDTH = 180
  
class PreTestGuessWhile extends Component {

  getInitWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3
    }
  }

  getWorldA() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3,
      stones:[{r:2,c:0,n:1}]
    }
  }

  getWorldB() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3,
      stones:[
        {r:2,c:0,n:1},
        {r:2,c:1,n:1}
      ],
      karelCol:2
    }
  }

  getWorldC() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3,
      stones:[
        {r:2,c:0,n:1},
        {r:2,c:1,n:1},
        {r:2,c:2,n:1}
      ],
      karelCol:2
    }
  }

  getWorldD() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3
    }
  }

  getWorldE() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:3,
      nCols:3,
      karelCol:2
    }
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <GuessPost
        img = {CodeWhile}
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

export default PreTestGuessWhile