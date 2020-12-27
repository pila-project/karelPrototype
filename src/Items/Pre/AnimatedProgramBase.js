import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

class ModifyMoves extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">

        <IdeItem
          instructions = {<span className="horizontal spaceBetween">
            <span>
              <b>Program</b> by dragging blocks.
            </span>
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
            karelCol:3,
            stones:[
              {r:0,c:1,n:1},
              {r:0,c:2,n:1},
            ]
          }}
          testStage = {'pre'}
          hideBlocks = {{
            'karel_procedure':true,
            'karel_while_dropdown':true,
            'controls_repeat_ext':true
          }}
        />
      </div>
    )
  }

}

export default ModifyMoves