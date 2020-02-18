import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">5</field></shadow></value><statement name="DO"><block type="karel_pickup_stone" deletable="false" movable="false" editable="false"></block></statement><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></statement></block></xml>`
class Repeat5 extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>Learn:</b> Hit the <b>step</b> button until the program finishes.
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
          hasRun={false}
          hasStep={true}
          hideBlocks = {{
            'karel_while_dropdown':true,
          }}
        />
      </div>
    )
  }

}

export default Repeat5