import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`//<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false"><value name="TIMES"><shadow type="math_number"><field name="NUM">10</field></shadow></value><statement name="DO"><block type="karel_if_dropdown" deletable="false" movable="false"><field name="CONDITION">FRONT_CLEAR</field><statement name="THEN"></statement></block></statement></statement></block></xml>`

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

    let xml = translateAllParts(initialXml, 'check stone')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use an if condition to solve both worlds. (Indicate whether to use stones to turn corners?)')}.
          </span>}
          preWorld = {{
            'world1':{
                width:300,
                height:300,
                nRows:4,
                nCols:4,
                karelRow:3,
                karelCol:0,
                karelDir:'East',
                stones: [
                  {r:3, c:0, n:1},
                  {r:2, c:1, n:1},
                  {r:1, c:2, n:1},
                ],
                walls: [
                  {r:3,c:0,d:'East'},
                  {r:2,c:1,d:'South'},
                  {r:2,c:1,d:'East'},
                  {r:1,c:2,d:'South'},
                  {r:1,c:2,d:'East'},
                  {r:0,c:3,d:'South'},
                ]
              },
              'world2': {
                width:350,
                height:235,
                nRows:4,
                nCols:6,
                karelRow:3,
                karelCol:0,
                karelDir: 'East',
                stones: [
                  {r:3, c:0, n:1},
                  {r:2, c:1, n:1},
                  {r:2, c:2, n:1},
                  {r:1, c:3, n:1},
                  {r:1, c:4, n:1},
                ],
                walls: [
                  {r:3,c:0,d:'East'},
                  {r:2,c:1,d:'South'},
                  {r:2,c:2,d:'South'},
                  {r:2,c:2,d:'East'},
                  {r:1,c:3,d:'South'},
                  {r:1,c:4,d:'South'},
                  {r:1,c:4,d:'East'},
                  {r:0,c:5,d:'South'}
                ]
              }
        }}
          postWorld = {{
            'world1': {
              width:300,
              height:300,
              nRows:4,
              nCols:4,
              karelRow:0,
              karelCol:3,
              karelDir:'East',
              stones: [
                {r:2, c:1, n:1},
                {r:1, c:2, n:1},
                {r:0, c:3, n:1},
              ],
              walls: [
                {r:3,c:0,d:'East'},
                {r:2,c:1,d:'South'},
                {r:2,c:1,d:'East'},
                {r:1,c:2,d:'South'},
                {r:1,c:2,d:'East'},
                {r:0,c:3,d:'South'},
              ]
            },
            'world2': {
              width:350,
              height:235,
              nRows:4,
              nCols:6,
              karelRow:0,
              karelCol:5,
              karelDir: 'East',
              stones: [
                {r:2, c:1, n:1},
                {r:2, c:2, n:1},
                {r:1, c:3, n:1},
                {r:1, c:4, n:1},
                {r:0, c:5, n:1},
              ],
              walls: [
                {r:3,c:0,d:'East'},
                {r:2,c:1,d:'South'},
                {r:2,c:2,d:'South'},
                {r:2,c:2,d:'East'},
                {r:1,c:3,d:'South'},
                {r:1,c:4,d:'South'},
                {r:1,c:4,d:'East'},
                {r:0,c:5,d:'South'}
              ]
            }
          }}
          hasRun={true}
          hasStep={false}
          initialXml={xml}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'karel_if_dropdown': false,
            'karel_procedure':true,
            'controls_repeat_ext':false,

          }}
        />
      </div>
    )
  }

}

export default Item
