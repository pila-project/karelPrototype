import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate} from 'redux/translator.js'

const WORLD_WIDTH = 280
  
class PostTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6,
      stones: [
        {r:0,c:5,n:9},
        {r:0,c:3,n:9},
        {r:0,c:1,n:9},

        {r:1,c:4,n:9},
        {r:1,c:2,n:9},
        {r:1,c:0,n:9},

        {r:2,c:5,n:9},
        {r:2,c:3,n:9},
        {r:2,c:1,n:9},

        {r:3,c:4,n:9},
        {r:3,c:2,n:9},
        {r:3,c:0,n:9},

        {r:4,c:5,n:9},
        {r:4,c:3,n:9},
        {r:4,c:1,n:9},

        {r:5,c:4,n:9},
        {r:5,c:2,n:9},
        {r:5,c:0,n:9},
      ]
    }
  }

  getPostWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6
    }
  }

  render() {
    return (<div className="verticalContainer centered fullSize">
      <IdeItem
        instructions = {<span>
          <b>{translate('Challenge')}:</b> 
          &nbsp;{translate('Pick up all the stones')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        hideBlocks = {{
          'karel_while_dropdown':true,
        }}
        
      />
    </div>)
  }

  

}

export default PostTestA