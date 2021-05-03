import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

class Item extends Component {


  render() {

    let xml = translateAllParts(initialXml, 'check stone')

    var stones_row = []
    var nCol = 9;
    var nRow = 4;
    for (var i = 0; i < nCol-1; i++) {
      stones_row.push({r:nRow-1,c:i,n:1})
    }

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use a repeat to place a stone after each column')}.
          </span>}
          preWorld = {{
            'world1':{
                width:350,
                height:160,
                nRows:nRow,
                nCols:nCol,
                karelRow:3,
                karelCol:0,
                karelDir:'East',
                walls: [
                  {r:3,c:2,d:'East'},
                  {r:3,c:5,d:'East'},
                ],
                stones: stones_row
              },
              'world2': {
                width:350,
                height:160,
                nRows:nRow,
                nCols:nCol,
                karelRow:3,
                karelCol:0,
                karelDir:'East',
                walls: [
                  {r:3,c:3,d:'East'},
                  {r:2,c:3,d:'East'},
                  {r:1,c:3,d:'East'},
                  {r:3,c:6,d:'East'},
                  {r:2,c:6,d:'East'},
                  {r:1,c:6,d:'East'},
                ],
                stones: stones_row
              },
              'world3':{
                  width:350,
                  height:160,
                  nRows:nRow,
                  nCols:nCol,
                  karelRow:3,
                  karelCol:0,
                  karelDir:'East',
                  walls: [
                    {r:3,c:2,d:'East'},
                    {r:2,c:2,d:'East'},
                    {r:3,c:3,d:'East'},
                    {r:2,c:3,d:'East'},
                    {r:3,c:5,d:'East'},
                    {r:2,c:5,d:'East'},
                  ],
                  stones: stones_row
                }
        }}
          postWorld = {{
            'world1':{
                width:350,
                height:160,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:nCol-1,
                karelDir:'East',
                walls: [
                  {r:3,c:2,d:'East'},
                  {r:3,c:5,d:'East'},
                ],
                stones: []
              },
              'world2': {
                width:350,
                height:160,
                nRows:nRow,
                nCols:nCol,
                karelRow:nRow-1,
                karelCol:nCol-1,
                karelDir:'East',
                walls: [
                  {r:3,c:3,d:'East'},
                  {r:2,c:3,d:'East'},
                  {r:1,c:3,d:'East'},
                  {r:3,c:6,d:'East'},
                  {r:2,c:6,d:'East'},
                  {r:1,c:6,d:'East'},
                ],
                stones: []
              },
              'world3':{
                  width:350,
                  height:160,
                  nRows:nRow,
                  nCols:nCol,
                  karelRow:nRow-1,
                  karelCol:nCol-1,
                  karelDir:'East',
                  walls: [
                    {r:3,c:2,d:'East'},
                    {r:2,c:2,d:'East'},
                    {r:3,c:3,d:'East'},
                    {r:2,c:3,d:'East'},
                    {r:3,c:5,d:'East'},
                    {r:2,c:5,d:'East'},
                  ],
                  stones: []
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
