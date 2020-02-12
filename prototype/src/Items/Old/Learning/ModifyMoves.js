import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="30" y="30"><statement name="program"><block type="karel_move"><next><block type="karel_move"></block></next></block></statement></block></xml>`
class ModifyMoves extends Component {

  render() {
    return (
      <div className="vertical centered testBody">

        <IdeItem
          instructions = {<span className="horizontal spaceBetween">
            <span>
              <b>Challenge:</b> Add another "move" to the program.
            </span>
            <div>
              <FontAwesomeIcon 
                icon={faQuestionCircle}
              />
            </div>
          </span>}
          preWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4
          }}
          postWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4,
            karelCol:3
          }}
          initialXml = {initialXml}
        />
      </div>
    )
  }

}

export default ModifyMoves