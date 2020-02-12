import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = ``
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Challenge:</b> Write a program from scratch that makes Karel move to the position shown in the "Goal" world:
          </span>}
          preWorld = {{
            width:250,
            height:166.6,
            nRows:2,
            nCols:3
          }}
          postWorld = {{
            width:250,
            height:166.6,
            nRows:2,
            nCols:3,
            stones:[
              {r:1,c:1,n:1}
            ],
          }}
          initialXml = {initialXml}
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