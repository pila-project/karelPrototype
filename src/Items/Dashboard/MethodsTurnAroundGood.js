import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate, translateAllParts} from 'redux/translator.js'


const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn around"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn around"></mutation></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="205"><field name="NAME">turn around</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    let xml = translateAllParts(initialXml, 'turn around')
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Good Example')}:</b>
            &nbsp;{translate('This program teaches Karel a new command: turn around')}:
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
          initialXml = {xml}
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
