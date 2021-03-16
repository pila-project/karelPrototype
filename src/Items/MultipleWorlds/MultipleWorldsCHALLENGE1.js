import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

class Item extends Component {

  stonesAndWalls(sequence, row_start, n) {
    var walls = []
    var stones = []
    var col_start = 0
    sequence.forEach(dir => {
      switch(dir) {
        case 'up':
          if (row_start < n-1) {
            walls.push({r:(row_start),c:(col_start),d:'South'})
          }
          stones.push({r:row_start,c:col_start,n:1})
          for (var counter = 1; counter < 4; counter++) {
            walls.push({r:(row_start-counter+1),c:(col_start+counter),d:'East'})
            stones.push({r:row_start-counter+1,c:col_start+counter,n:1})
            if (row_start - counter + 1 < n-1) {
              walls.push({r:(row_start-counter+1),c:(col_start+counter),d:'South'})
            }
          }
          row_start = row_start - 3
          col_start = col_start + 5
          walls.push({r:(row_start),c:(col_start-1),d:'South'})
          break;

        case 'down':
          walls.push({r:(row_start),c:(col_start),d:'South'})
          for (var counter = 1; counter < 4; counter++) {
            walls.push({r:(row_start+counter),c:(col_start+counter),d:'East'})
            walls.push({r:(row_start+counter),c:(col_start+counter),d:'North'})
            stones.push({r:row_start+counter-1,c:col_start+counter,n:1})
          }
          row_start = row_start + 3
          col_start = col_start + 5
          if (row_start < n-1) {
            walls.push({r:(row_start),c:(col_start-1),d:'South'})
          }
      }
    })
    return {walls:walls, stones:stones}
  }



  render() {
    var n1 = 4
    var m1 = 10
    var stonewalls1 = this.stonesAndWalls(['up','down'],n1-1,n1)

    var n2 = 4
    var m2 = 10
    var stonewalls2 = this.stonesAndWalls(['down','up'],0,n2)

    var n3 = 7
    var m3 = 10
    var stonewalls3 = this.stonesAndWalls(['up','up'],n3-1,n3)

    var n4 = 7
    var m4 = 10
    var stonewalls4 = this.stonesAndWalls(['down','down'],0,n4)

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
                width:400,
                height:160,
                nRows:n1,
                nCols:m1,
                karelRow:n1-1,
                karelCol:0,
                karelDir:'East',
                walls: stonewalls1['walls'],
                stones: stonewalls1['stones']
              },
              'world2': {
                width:400,
                height:160,
                nRows:n2,
                nCols:m2,
                karelRow:0,
                karelCol:0,
                karelDir:'East',
                walls: stonewalls2['walls'],
                stones: stonewalls2['stones']
              },
              'world3':{
                  width:400,
                  height:280,
                  nRows:n3,
                  nCols:m3,
                  karelRow:n3-1,
                  karelCol:0,
                  karelDir:'East',
                  walls: stonewalls3['walls'],
                  stones: stonewalls3['stones']
                },
                'world4':{
                    width:400,
                    height:280,
                    nRows:n3,
                    nCols:m3,
                    karelRow:0,
                    karelCol:0,
                    karelDir:'East',
                    walls: stonewalls4['walls'],
                    stones: stonewalls4['stones']
                  },
        }}
          postWorld = {{
            'world1': {
              width:400,
              height:160,
              nRows:n1,
              nCols:m1,
              karelRow:n1-1,
              karelCol:m1-1,
              karelDir:'East',
              walls: stonewalls1['walls']
            },
            'world2': {
              width:400,
              height:160,
              nRows:n2,
              nCols:m2,
              karelRow:0,
              karelCol:m2-1,
              karelDir:'East',
              walls: stonewalls2['walls']
            },
            'world3': {
              width:400,
              height:280,
              nRows:n3,
              nCols:m3,
              karelRow:0,
              karelCol:m3-1,
              karelDir:'East',
              walls: stonewalls3['walls']
            },
            'world4': {
              width:400,
              height:280,
              nRows:n4,
              nCols:m4,
              karelRow:n4-1,
              karelCol:m4-1,
              karelDir:'East',
              walls: stonewalls4['walls']
            },
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
