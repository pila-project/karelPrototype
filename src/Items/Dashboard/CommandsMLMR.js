import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'There are at least two ways to make Karel move from the start to the end position. Pick one, and place block after block into the "main" block. You can place as many blocks of each type as you want.'
]

class Item extends Component {

  render() {

    let initXml = translateAllParts(initialXml, 'turn right')
    let solXml = translateAllParts(solutionXml, 'turn right')


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
            nRows:2,
            nCols:2,
            //karelRow: 1,
            //karelCol: 0,
            walls:[
            ],
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            karelCol:1,
            karelRow:0
          }}
          initialXml={initXml}
          solutionXml={solXml}
          hints={hintMessages}
          hideBlocks = {{
            'karel_procedure':true,
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_if_dropdown': true
          }}
        />
      </div>
    )
  }

}

export default Item
