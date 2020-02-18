import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelCommands from 'Components/Templates/KarelCommands.js'


const WORLD_HEIGHT = 250
  
class KarelCommandsPickStone extends Component {

  render() {
    return <KarelCommands
      title = {<h1>Karel can <span style={{color:'blue'}}>pick stones</span></h1>}
      preWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
        stones:[
          {r:1,c:0,n:1}
        ]
      }}
      postWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
      }}
      hasMove = {false}
      hasTurnLeft = {false}
      hasPlaceStone ={false}
    />
  }

}

export default KarelCommandsPickStone