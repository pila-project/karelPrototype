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

const solutionXml = `<xml><block type="karel_main" x="20" y="20"><statement name="program"><block type="procedures_callnoargsnoreturn"><mutation name="pick up stones in line"></mutation><next><block type="procedures_callnoargsnoreturn"><mutation name="go back to beginning position"></mutation><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="procedures_callnoargsnoreturn"><mutation name="pick up stones in line"></mutation><next><block type="procedures_callnoargsnoreturn"><mutation name="go back to beginning position"></mutation></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="251"><field name="NAME">pick up stones in line</field><statement name="STACK"><block type="karel_move"><next><block type="karel_pickup_stone"><next><block type="karel_move"><next><block type="karel_move"><next><block type="karel_pickup_stone"></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="437"><field name="NAME">go back to beginning position</field><statement name="STACK"><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_move"><next><block type="karel_move"><next><block type="karel_move"></block></next></block></next></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'As shown in the examples, split up the sequence of actions of Karel into the two blocks such that each subsequence corresponds to the name of each function.',
  'The function "go back to beginning position" should not have any stone-related blocks in it, and should change the orientation of Karel only before moving back, but not afterwards.'
]

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

    let initXml = translateAllParts(initialXml, 'turn around')
    let solXml = translateAllParts(solutionXml, 'turn right')

    return (<div className="verticalContainer centered fullSize">
      <IdeItem
        instructions = {<span>
          <b>{translate('Challenge')}:</b>
          &nbsp;{translate('Complete the two functions to solve the problem')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        initialXml={initXml}
        solutionXml={solXml}
        hints={hintMessages}
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
