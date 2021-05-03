import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

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
            &nbsp;{translate('Use a while loop to pick up the stone piles in both worlds')}.
          </span>}
          preWorld = {{
            'world1':{
                width:300,
                height:300,
                nRows:3,
                nCols:3,
                karelRow:2,
                karelCol:1,
                karelDir:'East',
                stones: [
                  {r:0, c:1, n:1},
                  {r:1, c:2, n:1},
                  {r:2, c:1, n:1},
                  {r:1, c:0, n:1}
                ]
              },
              'world2': {
                width:300,
                height:300,
                nRows:3,
                nCols:3,
                karelRow:2,
                karelCol:1,
                karelDir: 'East',
                stones: [
                  {r:0, c:1, n:3},
                  {r:1, c:2, n:3},
                  {r:2, c:1, n:3},
                  {r:1, c:0, n:3}
                ]
              }
        }}
          postWorld = {{
            'world1': {
              width:300,
              height:300,
              nRows:3,
              nCols:3,
              karelRow:2,
              karelCol:1,
              karelDir: 'East'
            },
            'world2': {
              width:300,
              height:300,
              nRows:3,
              nCols:3,
              karelRow:2,
              karelCol:1,
              karelDir: 'East'
            }
          }}
          hasRun={true}
          hasStep={false}
          initialXml={xml}
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
