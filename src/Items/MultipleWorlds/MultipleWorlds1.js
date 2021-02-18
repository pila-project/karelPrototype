import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = ``
class RepeatCorners extends Component {

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
                nRows:4,
                nCols:4,
                karelRow:1,
                karelCol:2,
                karelDir:'East',
                stones: [
                  {r:1, c:3, n:1},
                  {r:0, c:3, n:1}
                ]
              },
              'world2': {
                width:300,
                height:300,
                nRows:4,
                nCols:4,
                karelRow:0,
                karelCol:1,
                karelDir: 'South',
                stones: [
                  {r:2, c:1, n:1},
                  {r:2, c:2, n:1}
                ]
              },
              'world3': {
                width:300,
                height:300,
                nRows:4,
                nCols:4,
                karelRow:3,
                karelCol:2,
                karelDir: 'North',
                stones: [
                  {r:0, c:2, n:1},
                  {r:0, c:1, n:1}
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
              karelCol:0,
              karelDir: 'West'
            },
            'world2': {
              width:300,
              height:300,
              nRows:4,
              nCols:4,
              karelRow:0,
              karelCol:2,
              karelDir: 'North'
            },
            'world3': {
              width:300,
              height:300,
              nRows:4,
              nCols:4,
              karelRow:1,
              karelCol:1,
              karelDir: 'South'
            }
          }}
          hasRun={true}
          hasStep={false}
          hideBlocks = {{
            'karel_while_dropdown':false,
            'karel_if_dropdown': false
          }}
        />
      </div>
    )
  }

}

export default RepeatCorners
