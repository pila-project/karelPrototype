import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = ``
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