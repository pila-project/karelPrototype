import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_place_stone" deletable="false" movable="false" editable="false"></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></statement></block></xml>`
class Repeat5 extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Good Example')}:</b> 
            &nbsp;{translate('This program uses a repeat to place 5 stones')}.
          </span>}
          preWorld = {{
            width:300,
            height:300 * (3/4),
            nRows:3,
            nCols:4,
          }}
          postWorld = {{
            width:300,
            height:300  * (3/4),
            nRows:3,
            nCols:4,
            stones:[{r:2,c:2,n:5}]
          }}
          initialXml = {initialXml}
          hasRun={true}
          hasStep={false}
          hideBlocks = {{
            'karel_while_dropdown':true,
          }}
          isEditable={false}
        />
      </div>
    )
  }

}

export default Repeat5