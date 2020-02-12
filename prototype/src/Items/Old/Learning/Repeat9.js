import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = ''
class Repeat9 extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <IdeItem
          instructions = {<span>
            <b>Challenge:</b> Use a repeat to place 9 stones.
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
            stones:[{r:2,c:1,n:9}]
          }}
          initialXml = {initialXml}
          hasRun={true}
          hasStep={true}
        />
      </div>
    )
  }

}

export default Repeat9