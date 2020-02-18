import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = `<xml><block disabled="false" readonly="true" type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="20" y="280"><field name="NAME">turn right</field></block></xml>`
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Example:</b> This program has karel pick up a stone and move it around a corner. It creates a new method to "turn right":
          </span>}
          preWorld = {{
            width:250,
            height:187.5,
            nRows:3,
            nCols:4,
            walls:[
              {r:2,c:1,d:'East'},
              {r:2,c:2,d:'North'},
              {r:2,c:3,d:'North'}
            ],
            stones:[
              {r:2,c:1,n:1}
            ],
          }}
          postWorld = {{
            width:250,
            height:187.5,
            nRows:3,
            nCols:4,
            walls:[
              {r:2,c:1,d:'East'},
              {r:2,c:2,d:'North'},
              {r:2,c:3,d:'North'}
            ],
            stones:[
              {r:1,c:2,n:1}
            ],
            karelRow:1,
            karelCol:3
          }}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true
          }}
        />
      </div>
    )
  }

}

export default Item