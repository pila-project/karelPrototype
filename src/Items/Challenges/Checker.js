import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const WORLD_WIDTH = 300

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="232"><field name="NAME">pickup 4</field><statement name="STACK"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">3</field></shadow></value><statement name="DO"><block type="procedures_callnoargsnoreturn"><mutation name="pickup block"></mutation><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="257"><field name="NAME">pickup 4</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="karel_pickup_stone"></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" x="20" y="395"><field name="NAME">pickup one line</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">3</field></shadow></value><statement name="DO"><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="pickup 4"></mutation><next><block type="karel_move"></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" x="20" y="583"><field name="NAME">pickup block</field><statement name="STACK"><block type="procedures_callnoargsnoreturn"><mutation name="pickup one line"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="procedures_callnoargsnoreturn"><mutation name="pickup one line"></mutation></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" x="20" y="794"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'What are the different patterns in the arrangement of stones? Write a function for each pattern, starting with the smallest one first.',
  'Start with creating a function for picking up a pile of three. How often could you repeat this function to pick up a line of piles? Once you have function for picking up a line, how could you use it to pick up a sequence of lines?'
]

class PostTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH*0.85,
      nRows:7,
      nCols:8,
      stones: [
        {r:1,c:6,n:4},
        {r:1,c:4,n:4},
        {r:1,c:2,n:4},

        {r:2,c:5,n:4},
        {r:2,c:3,n:4},
        {r:2,c:1,n:4},

        {r:3,c:6,n:4},
        {r:3,c:4,n:4},
        {r:3,c:2,n:4},

        {r:4,c:5,n:4},
        {r:4,c:3,n:4},
        {r:4,c:1,n:4},

        {r:5,c:6,n:4},
        {r:5,c:4,n:4},
        {r:5,c:2,n:4},

        {r:6,c:5,n:4},
        {r:6,c:3,n:4},
        {r:6,c:1,n:4},
      ]
    }
  }

  getPostWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH*0.85,
      nRows:7,
      nCols:8,
      karelRow: 0,
      karelCol: 0,
      karelDir: 'East',

    }
  }

  render() {

    let initXml = translateAllParts(initialXml, 'turn right')
    let solXml = translateAllParts(solutionXml, 'turn right')


    return (<div className="verticalContainer centered fullSize">
      <IdeItem
        instructions = {<span>
          <b>{translate('Challenge')}:</b>
          &nbsp;{translate('Pick up all the stones, by writing a program that uses REPEAT blocks and new functions; similar to the previous problem')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        initialXml={initXml}
        solutionXml={solXml}
        hints={hintMessages}
        hideBlocks = {{
          'karel_while_dropdown':true,
          'karel_while_dropdown':true,
          'karel_if_dropdown': true
        }}

      />
    </div>)
  }



}

export default PostTestA
