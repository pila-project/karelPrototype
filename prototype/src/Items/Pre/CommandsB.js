import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'


const WORLD_HEIGHT = 250
  
class CommandsB extends Component {

  renderPreWorld() {
    return {
      width: WORLD_HEIGHT,
      height: WORLD_HEIGHT,
      nRows: 2,
      nCols: 2,
      stones: [{r:1,c:1,n:1}],
      walls:[{r:1,c:0,d:'North'}]
    }
  }

  renderPostWorld() {
    return {
      width: WORLD_HEIGHT,
      height: WORLD_HEIGHT,
      nRows: 2,
      nCols: 2,
      stones: [{r:0,c:1,n:1}],
      karelCol:0,
      karelRow:0,
      karelDir:'West',
      walls:[{r:1,c:0,d:'North'}]
    }
  }

  render() {
    return <KarelCommands
      title={<h1>Karel can perform many commands:</h1>}
      preWorld={this.renderPreWorld()}
      postWorld = {this.renderPostWorld()}
    />
  }

  

}

export default CommandsB