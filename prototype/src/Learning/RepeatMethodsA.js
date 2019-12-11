import React, { Component } from 'react'

import ExampleCode from '../Components/Templates/ExampleCode.js'
import IdeSingleWorld from '../Components/Templates/IdeSingleWorld.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="place border"></mutation></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="29" y="99"><field name="NAME">place border</field><statement name="STACK"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="place line"></mutation><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></statement></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="30" y="262"><field name="NAME">place line</field><statement name="STACK"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></statement></block></statement></block></xml>`
class RepeatMethodsA extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeSingleWorld
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:6,
            nCols:6,
          }}
          initialXml = {initialXml}
          hasRun={false}
          hasStep={true}
          isEditable={false}
        />
      </div>
    )
  }

}

export default RepeatMethodsA