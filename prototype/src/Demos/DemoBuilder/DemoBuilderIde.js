import React, { Component } from 'react'

import ExampleCode from '../../Components/Templates/ExampleCode.js'
import BuilderIde from '../../Components/Templates/BuilderIde.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"></block></xml>`
class DemoBuilderIde extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <BuilderIde
          instructions = {<span>
            <b>Challenge:</b> Teach karel to turn around by filling in the "turn around" block.
          </span>}
          
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default DemoBuilderIde