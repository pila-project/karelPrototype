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
            &nbsp;{translate('Use a repeat to place a stone after each column')}.
          </span>}
          preWorld = {{
            'world1':{
                width:300,
                height:300,
                nRows:3,
                nCols:3,
                karelRow:0,
                karelCol:0,
                karelDir:'East',
                stones: [
                  {r:0, c:2, n:1},
                  {r:2, c:2, n:1},
                  {r:2, c:0, n:1}
                ]
              },
              'world2': {
                width:300,
                height:300,
                nRows:3,
                nCols:3,
                karelRow:0,
                karelCol:0,
                karelDir: 'East',
                stones: [
                  {r:0, c:0, n:1},
                ]
              }
        }}
          postWorld = {{
            'world1': {
              width:300,
              height:300,
              nRows:3,
              nCols:3,
              karelRow:0,
              karelCol:0,
              karelDir: 'North'
            },
            'world2': {
              width:300,
              height:300,
              nRows:3,
              nCols:3,
              karelRow:0,
              karelCol:0,
              karelDir: 'West'
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
