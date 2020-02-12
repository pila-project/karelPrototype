import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from '../Img/thisIsProgram.png'
import MsgRun from '../Img/hitRunButton.png'

const initialXml = ``
class Item extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeItem
          instructions = {<span>
            <b>Challenge:</b> Write a program from scratch.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            karelCol:1,
            karelRow:0
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default Item