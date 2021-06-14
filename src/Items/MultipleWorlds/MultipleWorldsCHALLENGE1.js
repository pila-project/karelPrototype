import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_while_dropdown"><field name="CONDITION">FRONT_CLEAR</field><statement name="LOOP"><block type="karel_move"><next><block type="karel_if_dropdown"><field name="CONDITION">FRONT_CLEAR</field><statement name="THEN"><block type="karel_if_dropdown"><field name="CONDITION">STONES_PRESENT</field><statement name="THEN"><block type="karel_pickup_stone"><next><block type="karel_move"><next><block type="karel_turn_left"></block></next></block></next></block></statement></block></statement><next><block type="karel_if_dropdown"><field name="CONDITION">FRONT_BLOCKED</field><statement name="THEN"><block type="karel_if_dropdown"><field name="CONDITION">STONES_PRESENT</field><statement name="THEN"><block type="karel_pickup_stone"><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"></block></next></block></next></block></next></block></statement></block></statement></block></next></block></next></block></statement></block></statement></block></xml>`

const hintMessages = [
  'Look at the placement of stones in each problem. What do you notice about their position with respect to the inner shape of walls?',
  'Use a WHILE loop that checks if front is clear, and use the stones as points of decision (i.e. implemented as IF condition blocks). You can use IF condition blocks within WHILE loop blocks that use the same check (e.g. whether front is clear, or stone is present).'
]

class Item extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 0; i < n-1; i++) {
      walls.push({r:(1),c:(i),d:'East'})
    }
    return walls
  }

  render() {
    var n = 5
    var stones = []
    for (var i = 1; i < n; i++) {
      stones.push({r:1,c:i,n:1})
    }

    var walls = this.makeWalls(0)

    let initXml = translateAllParts(initialXml, 'check stone')
    let solXml = translateAllParts(solutionXml, 'check stone')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use a WHILE loop and multiple IF conditions, to trace the shape and pick up all the stones in both worlds.')}.
          </span>}
          preWorld = {{
            'world1':{
                width:300,
                height:200,
                nRows:4,
                nCols:6,
                karelRow:3,
                karelCol:0,
                karelDir:'East',
                walls: [
                  {r:3, c:2, d:'North'},
                  {r:3, c:3, d:'North'},
                  {r:2, c:3, d:'East'},
                  {r:1, c:3, d:'East'},
                  {r:1, c:2, d:'North'},
                  {r:1, c:3, d:'North'},
                  {r:1, c:1, d:'East'},
                  {r:2, c:1, d:'East'},
                ],
                stones: [
                  {r:0, c:2, n:1},
                  {r:1, c:4, n:1},
                  {r:3, c:3, n:1},
                  {r:2, c:1, n:1}
                ]
              },
              'world2': {
                width:300,
                height:250,
                nRows:5,
                nCols:6,
                karelRow:4,
                karelCol:0,
                karelDir: 'East',
                walls: [
                  {r:2, c:2, d:'North'},
                  {r:2, c:1, d:'East'},
                  {r:3, c:1, d:'East'},
                  {r:2, c:3, d:'North'},
                  {r:2, c:4, d:'North'},
                  {r:1, c:4, d:'East'},
                  {r:1, c:4, d:'North'},
                  {r:1, c:3, d:'North'},
                  {r:1, c:2, d:'North'},
                  {r:1, c:1, d:'North'},
                  {r:1, c:0, d:'East'},
                  {r:2, c:0, d:'East'},
                  {r:3, c:0, d:'East'},
                  {r:4, c:1, d:'North'},
                ],
                stones: [
                  {r:4, c:1, n:1},
                  {r:2, c:2, n:1},
                  {r:2, c:4, n:1},
                  {r:0, c:1, n:1},
                  {r:3, c:0, n:1},
                  {r:1, c:5, n:1}
                ]
              }
        }}
          postWorld = {{
            'world1': {
              width:300,
              height:200,
              nRows:4,
              nCols:6,
              karelRow:3,
              karelCol:5,
              karelDir:'East',
              walls: [
                {r:3, c:2, d:'North'},
                {r:3, c:3, d:'North'},
                {r:2, c:3, d:'East'},
                {r:1, c:3, d:'East'},
                {r:1, c:2, d:'North'},
                {r:1, c:3, d:'North'},
                {r:1, c:1, d:'East'},
                {r:2, c:1, d:'East'},
              ],
            },
            'world2': {
              width:300,
              height:250,
              nRows:5,
              nCols:6,
              karelRow:4,
              karelCol:5,
              karelDir: 'East',
              walls: [
                {r:2, c:2, d:'North'},
                {r:2, c:1, d:'East'},
                {r:3, c:1, d:'East'},
                {r:2, c:3, d:'North'},
                {r:2, c:4, d:'North'},
                {r:1, c:4, d:'East'},
                {r:1, c:4, d:'North'},
                {r:1, c:3, d:'North'},
                {r:1, c:2, d:'North'},
                {r:1, c:1, d:'North'},
                {r:1, c:0, d:'East'},
                {r:2, c:0, d:'East'},
                {r:3, c:0, d:'East'},
                {r:4, c:1, d:'North'},
              ]
            }
          }}
          hasRun={true}
          hasStep={false}
          initialXml={initXml}
          solutionXml={solXml}
          hints={hintMessages}
          hideBlocks = {{
            'karel_while_dropdown':false,
            'karel_if_dropdown': false,
            'karel_procedure':true,
            'controls_repeat_ext':true,

          }}
        />
      </div>
    )
  }

}

export default Item
