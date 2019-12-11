import React, { Component } from 'react'

import ExampleCode from '../Components/Templates/ExampleCode.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = ``
class ModifyMoves extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeSingleWorldNoStep
          instructions = {<span>
            <b>Challenge:</b> Write a program from scratch.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            karelCol:1,
            karelRow:0
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default ModifyMoves