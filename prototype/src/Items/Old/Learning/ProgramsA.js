import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'

import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="30" y="30"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></statement></block></xml>`
class ProgramsA extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <ExampleCode
          world = {{
            width:300,
            height:300,
            nRows:4,
            nCols:4
          }}
          initialXml = {initialXml}
        >
        </ExampleCode>
        <img style= {{
          position:'absolute',
          height:150,
          top:120,
          marginLeft:-60
          }}
          src={MsgProgram} />
        <img style= {{
          position:'absolute',
          height:150,
          top:370,
          marginLeft:-60,
          zIndex:999
          }}
          src={MsgRun} />
      </div>
    )
  }

}

export default ProgramsA