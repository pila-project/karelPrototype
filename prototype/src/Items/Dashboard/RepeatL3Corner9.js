import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = ``
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
            stones:[
              {r:0,c:0,n:9},
              {r:0,c:2,n:9},
              {r:2,c:2,n:9},
              {r:2,c:0,n:9},
            ]
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