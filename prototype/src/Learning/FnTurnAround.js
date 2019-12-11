import React, { Component } from 'react'

import ExampleCode from '../Components/Templates/ExampleCode.js'
import IdeSingleWorldNoStep from '../Components/Templates/IdeSingleWorldNoStep.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn around"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn around"></mutation></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" x="27" y="223"><field name="NAME">turn around</field></block></xml>`
class ModifyC extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeSingleWorldNoStep
          instructions = {<span>
            <b>Challenge:</b> Teach karel to turn around by filling in the "turn around" block.
          </span>}
          
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            stones:[{r:1,c:1,n:1}]
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default ModifyC