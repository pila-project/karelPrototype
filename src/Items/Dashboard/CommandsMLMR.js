import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate} from 'redux/translator.js'
const initialXml = ``
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Challenge')}: </b>
            {translate('Write a program from scratch that makes Karel move to the position shown in the "Goal" world')}.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            //karelRow: 1,
            //karelCol: 0,
            walls:[
            ],
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:2,
            nCols:2,
            karelCol:1,
            karelRow:0
          }}
          hideBlocks = {{
            'karel_procedure':true,
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_if_dropdown': true
          }}
        />
      </div>
    )
  }

}

export default Item
