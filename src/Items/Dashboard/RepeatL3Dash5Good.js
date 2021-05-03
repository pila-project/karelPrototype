import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<?xml version="1.0" encoding="UTF-8"?><xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">3</field></shadow></value><statement name="DO"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="pickup 5" /><next><block type="karel_move" deletable="false" movable="false" editable="false" /></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="207"><field name="NAME">pickup 5</field><statement name="STACK"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false" /></statement></block></statement></block></xml>`
class Item extends Component {

  render() {
    const nCols = 7
    let xml = translateAllParts(initialXml, 'pickup 5')
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Good Example')}:</b>
            &nbsp;{translate('This program combines a REPEAT block with a new command')}.
          </span>}
          preWorld = {{
            width:300,
            height:300 * (2/nCols),
            nRows:2,
            nCols:nCols,
            stones:[
              {r:1,c:1,n:5},
              {r:1,c:3,n:5},
              {r:1,c:5,n:5}
            ]
          }}
          postWorld = {{
            width:300,
            height:300 * (2/nCols),
            nRows:2,
            nCols:nCols,
            karelCol:nCols - 1
          }}
          initialXml = {xml}
          hasRun={true}
          hasStep={false}
          isEditable={false}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'karel_if_dropdown': true
          }}
          isEditable={false}
        />
      </div>
    )
  }

}

export default Item
