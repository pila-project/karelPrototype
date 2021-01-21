import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate} from 'redux/translator.js'
//const initialXml = ``

const parsonBlocks = {
  'karel_move': {'NAME':'', 'NUMBER': 2}, // NAME: TO BE IMPLEMENTED - Label for the block if another label is to be given than 'move forward'; NUMBER: number of blocks
  'karel_turn_left': {'NAME': '', 'NUMBER': 3},
  'karel_pickup_stone': {'NAME': '', 'NUMBER': 3},
  'karel_place_stone': {'NAME': '', 'NUMBER': 2},
  'controls_repeat_ext': {'NAME': '', 'TIMES': [
    {'NUM': 2, 'editable': false, 'NUMBER': 1},
    {'NUM': 3, 'editable': false, 'NUMBER': 2},
    {'NUM': 7, 'editable': false, 'NUMBER': 1},
  ], 'DO': ''},
  'procedures_defnoargsnoreturn': [
    {'NAME': 'turn right', 'NUMBER': 1} // NUMBER refers to number of instances
  ]
}

function moveCoordinates(xCo, yCo, initialX, initialY, deltaX, deltaY) {

  if (yCo < 400) {
    yCo += deltaY;
  } else {
    yCo = initialY;
    xCo += deltaX;
  }

  return [xCo, yCo]
}

function  initializeCode(blockList) {

    var initX = 20;
    var initY = 180;
    var deltaX = 130;
    var deltaY = 30;
    var xCoord = initX;
    var yCoord = initY;
    var coords = '';
    var substring = ''

    var initialXml = `<xml><block type="karel_main" deletable="false" x="` + xCoord + `" y="` + yCoord + `"><statement name="program"></statement></block>`

    for (const label in blockList) {

      switch (label) {
        case 'procedures_defnoargsnoreturn':
          blockList[label].forEach( function(newFunct) {
            if (newFunct['NUMBER']>0) {
              substring = `<block type = "procedures_defnoargsnoreturn" deletable="false" x="` + xCoord + `" y="` + yCoord + `">` +
                           `<field name="NAME">` + newFunct['NAME'] + `</field></block>`
              initialXml += substring

              coords = moveCoordinates(xCoord, yCoord, initX, initY, deltaX, deltaY)
              xCoord = coords[0]
              yCoord = coords[1]

              for (var counter = 0; counter < newFunct['NUMBER']; ++counter) {
                let substring = `<block type="procedures_callnoargsnoreturn" deletable="false" x="` + xCoord + `" y="` + yCoord + `"><mutation name="` + newFunct['NAME'] + `"></mutation></block>`
                initialXml += substring
                //[xCoord, yCoord] = moveCoordinates(xCoord, yCoord, initX)
              }
            }
          })
          break;

        case 'controls_repeat_ext':
          let repeatNum = '';
          for (var counter = 0; counter < blockList[label]['TIMES'].length; counter++) {
            for (var countIter = 0; countIter < blockList[label]['TIMES'][counter]['NUMBER']; countIter++) {
              repeatNum = `<shadow type="math_number" editable="`+ blockList[label]['TIMES'][counter]['editable'] +
              `"><field name="NUM">` + blockList[label]['TIMES'][counter]['NUM'] + `</field></shadow>`
              substring =  `<block type="controls_repeat_ext" deletable="false" x="` + xCoord + `" y="` + yCoord + `"><value name="TIMES">` + repeatNum + `</value><statement name="DO"></statement></block>`
              initialXml += substring
              coords = moveCoordinates(xCoord, yCoord, initX, initY, deltaX, 80)
              xCoord = coords[0]
              yCoord = coords[1]
            }
          }
          break;

        default:
          for (var counter = 0; counter < blockList[label]['NUMBER']; counter++) {
            substring = `<block type="` + label + `" deletable="false" x="` + xCoord + `" y="` + yCoord + `"></block>`
            initialXml += substring
            coords = moveCoordinates(xCoord, yCoord, initX, initY, deltaX, deltaY)
            xCoord = coords[0]
            yCoord = coords[1]

          }
      }
    }

    initialXml += `</xml>`

    console.log('THIS IS THE FINAL INITIALXML')
    console.log(initialXml)
    return initialXml
  }

class Item extends Component {

  render() {

    const initialXml = initializeCode(parsonBlocks)

    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Challenge')}: </b>
            {translate('Write a program from scratch that makes Karel move to the position shown in the "Goal" world')}.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:5,
            nCols:5,
            walls:[
            ],
            stones:[
              {r:0,c:0,n:3},
              {r:2,c:2,n:3},
              {r:4,c:4,n:3},
            ],
            karelCol:0,
            karelRow:0
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:5,
            nCols:5,
            karelCol:4,
            karelRow:4
          }}
          initialXml = {initialXml}
          activateToolbox = {false}
        />
      </div>
    )
  }

}

export default Item
