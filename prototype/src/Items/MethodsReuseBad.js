import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const solnXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="34" y="226"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`
const initialXml = ``
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            Write a program that has karel turn right around this wall. You should define a "turn right" command to be three "turn left" commands
          </span>}
          preWorld = {{
            width:300,
            height:150,
            nRows:2,
            nCols:4,
          }}
          postWorld = {{
            width:300,
            height:150,
            nRows:2,
            nCols:4,
            stones:[
              {r:1,c:1,n:2},
              {r:1,c:2,n:2},
            ],
            karelCol:3
          }}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true
          }}
          examples = {[
            'Good Example',
            'Bad Example'
          ]}
        />
      </div>
    )
  }

}

export default Item