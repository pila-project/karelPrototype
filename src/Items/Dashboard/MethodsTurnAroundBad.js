import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate} from 'redux/translator.js'
const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Bad Example')}:</b>
            &nbsp;{translate('Although this program solves the problem, it is harder to read')}:
          </span>}
          preWorld = {{
            width:250,
            height:166.6,
            nRows:2,
            nCols:3
          }}
          postWorld = {{
            width:250,
            height:166.6,
            nRows:2,
            nCols:3,
            stones:[
              {r:1,c:1,n:1}
            ],
          }}
          initialXml = {initialXml}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_if_dropdown': true
          }}
          isEditable={false}
        />
      </div>
    )
  }

}

export default Item
