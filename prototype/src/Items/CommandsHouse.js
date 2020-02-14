import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    let walls = [
      // top roof
      {r:1,c:1,d:'North'},
      {r:1,c:2,d:'North'},

      // bottom floor
      {r:3,c:1,d:'North'},
      {r:3,c:2,d:'North'},

      // left wall
      {r:1,c:1,d:'East'},
      {r:2,c:1,d:'East'},

      // right wall
      {r:1,c:3,d:'East'},
    ]
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Example:</b> This example program makes Karel walk out of her house:
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:4,
            nCols:4,
            walls:walls,
            karelCol:1,
            karelRow:1,
            stones:[{r:2,c:3,n:1}]
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:4,
            nCols:4,
            karelCol:3,
            karelRow:2,
            walls:walls,
          }}
          initialXml = {initialXml}
          hideBlocks = {{
            'karel_procedure':true,
            'karel_while_dropdown':true,
            'controls_repeat_ext':true
          }}
        />
      </div>
    )
  }

}

export default Item