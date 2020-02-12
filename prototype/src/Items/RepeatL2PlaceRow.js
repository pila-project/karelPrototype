import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = ``
class RepeatCorners extends Component {

  render() {
    var nCols = 8
    var stones = []
    for (var i = 0; i < nCols - 1; i++) {
      stones.push({r:1,c:i,n:1})
    }

    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300 * (2/nCols),
            nRows:2,
            nCols:nCols,
            stones:stones
          }}
          postWorld = {{
            width:300,
            height:300 * (2/nCols),
            nRows:2,
            nCols:nCols,
          }}
          initialXml = {initialXml}
          hasRun={false}
          hasStep={true}
          hideBlocks = {{
            'karel_while_dropdown':true,
          }}
        />
      </div>
    )
  }

}

export default RepeatCorners