import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'


const WORLD_WIDTH = 280

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="pick up stones in line"></mutation><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="move to next place"></mutation><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="pick up stones in line"></mutation><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="move to next place"></mutation></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" editable="false" movable="false" x="20" y="201"><field name="NAME">pick up stones in line</field><statement name="STACK"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="437"><field name="NAME">move to next place</field><statement name="STACK"></statement></block></xml>`

class PostTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:4,
      nCols:4,
      stones: [
        {r:0,c:0,n:1},
        {r:0,c:1,n:1},
        {r:0,c:2,n:1},
        {r:0,c:3,n:1},

        {r:3,c:0,n:1},
        {r:3,c:1,n:1},
        {r:3,c:2,n:1},
        {r:3,c:3,n:1},
      ]
    }
  }

  getPostWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:4,
      nCols:4,
      karelDir:'South'
    }
  }

  render() {

    let xml = translateAllParts(initialXml, 'turn around')

    return (<div className="verticalContainer centered fullSize">
      <IdeItem
        instructions = {<span>
          <b>{translate('Bad Example')}:</b>
          &nbsp;{translate('Although this program solves the problem, it only uses one of the functions, which makes it harder to read')}:
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        initialXml = {xml}
        isEditable={false}
        hideBlocks = {{
          'karel_while_dropdown': true,
          'controls_repeat_ext': true,
          'karel_if_dropdown': true
        }}
        restrictedUse = {{
          'karel_move': true,
          'karel_turn_left': false,
          'karel_place_stone': true,
          'karel_pickup_stone': true
        }}

      />
    </div>)
  }



}

export default PostTestA
