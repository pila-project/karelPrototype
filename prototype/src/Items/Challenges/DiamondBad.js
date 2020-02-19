import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate} from 'redux/translator.js'
const WORLD_WIDTH = 280
const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">9</field></shadow></value><statement name="DO"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></next></block></statement></block></xml>`
class PreTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6,
      stones: [
        {r:0,c:2,n:9},
        {r:0,c:3,n:9},
        {r:1,c:2,n:9},
        {r:1,c:3,n:9},

        {r:2,c:0,n:9},
        {r:3,c:0,n:9},
        {r:2,c:1,n:9},
        {r:3,c:1,n:9},

        {r:2,c:4,n:9},
        {r:3,c:4,n:9},
        {r:2,c:5,n:9},
        {r:3,c:5,n:9},

        {r:4,c:2,n:9},
        {r:4,c:3,n:9},
        {r:5,c:2,n:9},
        {r:5,c:3,n:9},
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
          <b>{translate('Example')}:</b> 
          &nbsp;{translate('Tries to pick up the stones without defining new commands')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        hideBlocks = {{
          'karel_while_dropdown':true,
        }}
        initialXml = {initialXml}
      />
    </div>)
  }

  

}

export default PreTestA