import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

class Item extends Component {


  render() {

    let xml = translateAllParts(initialXml, 'check stone')

    var stones_row = []
    var nCol = 6;
    var nRow = 2;
    for (var i = 0; i < nCol-1; i++) {
      stones_row.push({r:nRow-1,c:i,n:1})
    }

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use a WHILE loop and IF conditions to pick up all the stones')}.
          </span>}
          preWorld = {{
            'world1':{
                width:350,
                height:120,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:0,
                karelDir:'East',
                walls: [
                  {r:nRow-1,c:2,d:'East'},
                ],
                stones: stones_row
              },
              'world2': {
                width:350,
                height:120,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:0,
                karelDir:'East',
                walls: [
                  {r:nRow-1,c:1,d:'East'},
                  {r:nRow-1,c:3,d:'East'},
                ],
                stones: stones_row
              },
              'world3':{
                  width:350,
                  height:120,
                  nRows:nRow,
                  nCols:nCol,
                  karelRow:nRow-1,
                  karelCol:0,
                  karelDir:'East',
                  walls: [
                    {r:nRow-1,c:1,d:'East'},
                    {r:nRow-1,c:2,d:'East'},
                    {r:nRow-1,c:3,d:'East'},
                  ],
                  stones: stones_row
                }
        }}
          postWorld = {{
            'world1':{
                width:350,
                height:120,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:nCol-1,
                karelDir:'East',
                walls: [
                  {r:nRow-1,c:2,d:'East'},
                ],
              },
              'world2': {
                width:350,
                height:120,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:nCol-1,
                karelDir:'East',
                walls: [
                  {r:nRow-1,c:1,d:'East'},
                  {r:nRow-1,c:3,d:'East'},
                ],
              },
              'world3':{
                  width:350,
                  height:120,
                  nRows:nRow,
                  nCols:nCol,
                  karelRow:nRow-1,
                  karelCol:nCol-1,
                  karelDir:'East',
                  walls: [
                    {r:nRow-1,c:1,d:'East'},
                    {r:nRow-1,c:2,d:'East'},
                    {r:nRow-1,c:3,d:'East'},
                  ],
                }
          }}
          hasRun={true}
          hasStep={false}
          initialXml={xml}
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
