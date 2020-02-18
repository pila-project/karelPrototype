import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import UpTextArrow from 'Components/Util/UpTextArrow.js'
import UpLeftTextArrow from 'Components/Util/UpLeftTextArrow.js'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_move"><next><block type="karel_move"></block></next></block></statement></block></xml>`
class ModifyMoves extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">

        <IdeItem
          instructions = {<span className="horizontal spaceBetween">
            <span>
              <b>Instructions:</b> Add another "move" to the program.
            </span>
            {/*<div>
              <FontAwesomeIcon 
                icon={faQuestionCircle}
              />
            </div>*/}
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
          }}
          initialXml = {initialXml}
          testStage = {'pre'}
          hideBlocks = {{
            'karel_procedure':true,
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_turn_left':true,
            'karel_place_stone':true,
            'karel_pickup_stone':true
          }}
        />
        <span style = {{
          position:'absolute',
          top:90,
          left:910
        }}>
          <UpLeftTextArrow 
            text={<span>Put the <b>move</b> here</span>}
          />
        </span>
        <span style = {{
          position:'absolute',
          zIndex: 999,
          top:180,
          left:640
        }}>
          <UpTextArrow 
            text={<span>Drag the <b>move</b> from here</span>}
          />
        </span>
      </div>
    )
  }

}

export default ModifyMoves