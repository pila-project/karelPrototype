import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'


const WORLD_WIDTH = 280

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program">
<block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="pick up stones in line"></mutation><next>
<block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="go back to beginning position"></mutation><next>
<block type="karel_turn_left" deletable="false" movable="false" editable="false"><next>
<block type="karel_turn_left" deletable="false" movable="false" editable="false"><next>
<block type="karel_turn_left" deletable="false" movable="false" editable="false"><next>
<block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="pick up stones in line"></mutation><next>
<block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="go back to beginning position"></mutation>
</block></next></block></next></block></next></block></next></block></next></block></next></block>
</statement></block>
<block type="procedures_defnoargsnoreturn" deletable="false" movable="true" editable="true" x="20" y="280"><field name="NAME">pick up stones in line</field><statement name="STACK"></statement></block>
<block type="procedures_defnoargsnoreturn" deletable="false" movable="true" editable="true" x="20" y="558"><field name="NAME">go back to beginning position</field></block></xml>`


class PostTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:4,
      nCols:4,
      stones: [
        {r:0,c:0,n:1},
        {r:2,c:0,n:1},

        {r:3,c:1,n:1},
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
          <b>{translate('Challenge')}:</b>
          &nbsp;{translate('Complete the two functions to solve the problem')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        initialXml = {xml}
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
