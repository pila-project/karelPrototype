import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'

import {translate} from 'redux/translator.js'
const WORLD_SIZE = 150
  
class KarelCommandsPlaceStone extends Component {

  render() {
    let title = translate('Karel can place stones')
    return <KarelCommands
      title = {<h1>{title}:</h1>}
      preWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
        
      }}
      postWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
        stones:[
          {r:1,c:0,n:1}
        ]
      }}
      hasMove = {false}
      hasTurnLeft = {false}
      hasPickStone ={false}
    />
  }
}

export default KarelCommandsPlaceStone