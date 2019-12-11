import React, { Component } from 'react'

import ExampleCode from '../Components/Templates/ExampleCode.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="30" y="30"><statement name="program"><block type="karel_move"><next><block type="karel_move"></block></next></block></statement></block></xml>`
class ModifyMoves extends Component {

  render() {
    return (
      <div className="vertical centered testBody">

        <IdeSingleWorldNoStep
          instructions = {<span>
            <b>Challenge:</b> Add another "move" to the program.
          </span>}
          preWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4
          }}
          postWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4,
            karelCol:3
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default ModifyMoves