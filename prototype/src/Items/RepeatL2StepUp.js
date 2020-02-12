import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = ``
class Item extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 1; i < n; i++) {
      walls.push({r:(n-i),c:i,d:'North'})
       walls.push({r:(n-i),c:i,d:'East'})
    }
    return walls
  }

  render() {
    var n = 8

    var walls = this.makeWalls(n)

    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:n,
            nCols:n,
            walls:walls
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:n,
            nCols:n,
            walls:walls,
            karelRow:0,
            karelCol:n - 1
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

export default Item