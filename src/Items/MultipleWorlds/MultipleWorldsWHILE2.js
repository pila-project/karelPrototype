import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_while_dropdown"><field name="CONDITION">FRONT_CLEAR</field><statement name="LOOP"><block type="karel_move"><next><block type="karel_while_dropdown"><field name="CONDITION">STONES_PRESENT</field><statement name="LOOP"><block type="karel_pickup_stone"><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_move"><next><block type="karel_turn_left"></block></next></block></next></block></next></block></next></block></next></block></statement></block></next></block></statement></block></statement></block></xml>`

const hintMessages = [
  'You can have WHILE loop blocks within other WHILE loop blocks. Look at the difference between the two problems to decide what should be the condition for the outer WHILE loop.',
  'What sequence of actions could be triggered by a stone? And what position and orientation should Karel have after this sequence of actions?'
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
            &nbsp;{translate('Use multiple WHILE loops to find the hole in the fence and place stones in both worlds')}.
          </span>}
          preWorld = {{
            'world1':{
                width:350,
                height:340,
                nRows:4,
                nCols:4,
                karelRow:3,
                karelCol:0,
                karelDir:'North',
                stones: [
                  {r:1, c:0, n:1},
                  {r:1, c:1, n:1}
                ],
                walls: [
                  {r:(1),c:(0),d:'North'},
                  {r:(1),c:(1),d:'North'},
                  {r:(1),c:(3),d:'North'},
                ]
              },
              'world2': {
                width:350,
                height:340,
                nRows:4,
                nCols:4,
                karelRow:3,
                karelCol:0,
                karelDir:'North',
                stones: [
                  {r:2, c:0, n:1},
                  {r:2, c:1, n:1},
                  {r:2, c:2, n:1},
                ],
                walls: [
                  {r:(2),c:(0),d:'North'},
                  {r:(2),c:(1),d:'North'},
                  {r:(2),c:(2),d:'North'}
                ]
              }
        }}
          postWorld = {{
            'world1': {
              width:350,
              height:340,
              nRows:4,
              nCols:4,
              karelRow:0,
              karelCol:2,
              karelDir:'North',
              stones: [],
              walls: [
                {r:(1),c:(0),d:'North'},
                {r:(1),c:(1),d:'North'},
                {r:(1),c:(3),d:'North'},
              ]
            },
            'world2': {
              width:350,
              height:340,
              nRows:4,
              nCols:4,
              karelRow:0,
              karelCol:3,
              karelDir:'North',
              stones: [
              ],
              walls: [
                {r:(2),c:(0),d:'North'},
                {r:(2),c:(1),d:'North'},
                {r:(2),c:(2),d:'North'}
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
            'karel_if_dropdown': true,
            'karel_procedure':true,
            'controls_repeat_ext':true,
          }}
        />
      </div>
    )
  }

}

export default Item
