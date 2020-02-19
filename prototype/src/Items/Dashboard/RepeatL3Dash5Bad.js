import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">3</field></shadow></value><statement name="DO"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"></block></statement></block></next></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    const nCols = 7
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Bad Example')}:</b> 
            &nbsp;{translate('Although this program solves the problem, it is harder to read')}:
          </span>}
          preWorld = {{
            width:300,
            height:300 * (3/nCols),
            nRows:3,
            nCols:nCols,
            stones:[
              {r:2,c:1,n:5},
              {r:2,c:3,n:5},
              {r:2,c:5,n:5}
            ]
          }}
          postWorld = {{
            width:300,
            height:300 * (3/nCols),
            nRows:3,
            nCols:nCols,
            karelCol:nCols - 1
          }}
          initialXml = {initialXml}
          hasRun={true}
          hasStep={false}
          isEditable={false}
          hideBlocks = {{
            'karel_while_dropdown':true,
          }}
          isEditable={false}
        />
      </div>
    )
  }

}

export default Item