import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">3</field></shadow></value><statement name="DO"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoreturn" deletable="false" movable="false" editable="false"><mutation name="pickup 5"></mutation></block></next></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></statement></block><block type="procedures_defnoreturn" deletable="false" movable="false" editable="false" x="20" y="207"><field name="NAME">pickup 5</field><statement name="STACK"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"></block></statement></block></statement></block></xml>`
class Item extends Component {

  render() {
    const nCols = 7
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300 * (3/nCols),
            nRows:3,
            nCols:nCols,
            stones:[
              {r:2,c:1,n:5},
              {r:2,c:3,n:5},
              {r:2,c:5,n:5}
            ]
          }}
          postWorld = {{
            width:300,
            height:300 * (3/nCols),
            nRows:3,
            nCols:nCols,
            karelCol:nCols - 1
          }}
          initialXml = {initialXml}
          hasRun={false}
          hasStep={true}
          isEditable={false}
          hideBlocks = {{
            'karel_while_dropdown':true,
          }}
        />
      </div>
    )
  }

}

export default Item