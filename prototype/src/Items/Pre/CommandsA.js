import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import UpTextArrow from 'Components/Util/UpTextArrow.js'
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
    return <div>
      <KarelCommands
        title={<h1>Karel can perform many commands:</h1>}
        preWorld={this.renderPreWorld()}
        postWorld = {this.renderPostWorld()}
      />
      <div style={{height:20}} />
      <span>
        <UpTextArrow 
          text={<span>Use these buttons to make the <b>World</b> match the <b>Goal</b></span>}
        />
      </span>
    </div>
  }
}

export default CommandsA