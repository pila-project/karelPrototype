import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="34" y="226"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`
class ModifyC extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            karelRow:0,
            walls:[{r:1,c:0,d:'North'}]
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            walls:[{r:1,c:0,d:'North'}],
            karelDir:'West'
          }}
          initialXml = {initialXml}
          hasRun={false}
          hasStep={true}
        />
      </div>
    )
  }

}

export default ModifyC