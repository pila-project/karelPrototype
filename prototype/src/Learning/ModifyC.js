import React, { Component } from 'react'

import ExampleCode from '../Components/Templates/ExampleCode.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="30" y="30"><statement name="program"><block type="karel_move"><next><block type="karel_pickup_stone"><next><block type="karel_move"></block></next></block></next></block></statement></block></xml>`
class ModifyC extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeSingleWorldNoStep
          instructions = {<span>
            <b>Challenge:</b> Modify the program to pick up all three stones.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
            stones:[{r:2,c:1,n:3}]
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
            karelCol:2
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default ModifyC