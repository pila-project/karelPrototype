import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_while_dropdown" deletable="false" movable="false"><field name="CONDITION">FRONT_CLEAR</field><statement name="LOOP"></statement></block></statement></block></xml>`

class Item extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 0; i < n-1; i++) {
      walls.push({r:(1),c:(i),d:'East'})
    }
    return walls
  }

  render() {
    var n1 = 5
    var stones1 = []
    for (var j=0; j<n1; j++) {
      for (var i = 0; i < n1; i++) {
        stones1.push({r:i,c:j,n:1})
      }
    }

    var walls1 = []

    walls1.push({r:(1),c:(0),d:'East'})
    walls1.push({r:(2),c:(0),d:'East'})
    walls1.push({r:(3),c:(0),d:'East'})
    walls1.push({r:(2),c:(1),d:'East'})
    walls1.push({r:(2),c:(3),d:'East'})
    walls1.push({r:(3),c:(3),d:'East'})
    walls1.push({r:(1),c:(1),d:'North'})
    walls1.push({r:(1),c:(2),d:'North'})
    walls1.push({r:(1),c:(3),d:'North'})
    walls1.push({r:(1),c:(4),d:'North'})
    walls1.push({r:(2),c:(2),d:'North'})
    walls1.push({r:(2),c:(3),d:'North'})
    walls1.push({r:(4),c:(1),d:'North'})
    walls1.push({r:(4),c:(2),d:'North'})
    walls1.push({r:(4),c:(3),d:'North'});

    var n2 = 6
    var stones2 = []
    for (var j=0; j<n2-1; j++) {
      stones2.push({r:n2-1,c:j,n:1})
    }
    for (var i=1; i<n2-1; i++) {
      stones2.push({r:i,c:n2-2,n:1})
    }
    for (var j=1; j<n2-2; j++) {
      stones2.push({r:n2-5,c:j,n:1})
    }
    for (var i=2; i<n2-2; i++) {
      stones2.push({r:i,c:1,n:1})
    }
    for (var j=2; j<n2-3; j++) {
      stones2.push({r:n2-3,c:j,n:1})
    }
    for (var i=3; i<n2-3; i++) {
      stones2.push({r:i,c:n2-4,n:1})
    }
    stones2.push({r:2,c:2,n:1})


    var walls2 = []
    for (var j=0; j<n2-2; j++){
      walls2.push({r:(n2-1),c:(j),d:'North'})
    }
    for (var j=1; j<n2-3; j++){
      walls2.push({r:(n2-2),c:(j),d:'North'})
    }
    for (var j=1; j<n2-1; j++){
      walls2.push({r:(1),c:(j),d:'North'})
    }
    for (var j=2; j<n2-2; j++){
      walls2.push({r:(2),c:(j),d:'North'})
    }
    for (var i=1; i<n2; i++){
      walls2.push({r:(i),c:(n2-2),d:'East'})
    }
    for (var i=2; i<n2-1; i++){
      walls2.push({r:(i),c:(n2-3),d:'East'})
    }
    for (var i=2; i<n2-2; i++){
      walls2.push({r:(i),c:(n2-4),d:'East'})
    }
    for (var i=2; i<n2-3; i++){
      walls2.push({r:(i),c:(n2-5),d:'East'})
    }
    for (var i=1; i<n2-2; i++){
      walls2.push({r:(i),c:(0),d:'East'})
    }



    let xml = translateAllParts(initialXml, 'check stone')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Complete the while loops with if conditions, and pick appropriate statements, to pick up all the stones in both worlds. (Possibly provide partial code again?)')}.
          </span>}
          preWorld = {{
            'world1':{
                width:300,
                height:300,
                nRows:n1,
                nCols:n1,
                karelRow:2,
                karelCol:2,
                karelDir:'East',
                walls: walls1,
                stones: stones1
              },
              'world2': {
                width:400,
                height:400,
                nRows:n2,
                nCols:n2,
                karelRow:2,
                karelCol:2,
                karelDir: 'East',
                stones: stones2,
                walls: walls2
              }
        }}
          postWorld = {{
            'world1': {
              width:300,
              height:300,
              nRows:n1,
              nCols:n1,
              karelRow:0,
              karelCol:4,
              karelDir: 'West',
              walls: walls1
            },
            'world2': {
              width:400,
              height:400,
              nRows:n2,
              nCols:n2,
              karelRow:n2-1,
              karelCol:0,
              karelDir: 'East',
              walls: walls2
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
