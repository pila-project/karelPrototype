import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = ``
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
            <b>Challenge:</b> Write a program from scratch that makes Karel move to the position shown in the "Goal" world:
          </span>}
          preWorld = {{
            width:250,
            height:250,
            nRows:4,
            nCols:4,
            walls:walls,
            karelCol:1,
            karelRow:1,
            stones:[{r:2,c:3,n:1}]
          }}
          postWorld = {{
            width:250,
            height:250,
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