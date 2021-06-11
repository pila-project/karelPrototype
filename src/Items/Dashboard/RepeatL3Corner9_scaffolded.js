import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="232"><field name="NAME">place 4</field><statement name="STACK"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false"><value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="karel_turn_left"><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_place_stone"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="332"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'What sequence of actions does Karel need to repeat, and how often?',
  'What steps are involved for Karel to pick up the first stone? Make sure to use the function "turn right".'
]

class Item extends Component {

  render() {

    let initXml = translateAllParts(initialXml, 'turn right')
    let solXml = translateAllParts(solutionXml, 'turn right')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use TWO REPEAT BLOCKS AND A FUNCTION to place 4 stones in each corner')}.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:3,
            nCols:3,
            stones:[
              {r:0,c:0,n:4},
              {r:0,c:2,n:4},
              {r:2,c:2,n:4},
              {r:2,c:0,n:4},
            ]
          }}
          hasRun={true}
          hasStep={false}
          initialXml={initXml}
          solutionXml={solXml}
          hints={hintMessages}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'karel_if_dropdown': true
          }}
        />
      </div>
    )
  }

}

export default Item
