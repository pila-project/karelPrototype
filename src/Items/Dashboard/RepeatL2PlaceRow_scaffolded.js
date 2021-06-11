import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false" editable="true"><value name="TIMES"><shadow type="math_number" editable="true"><field name="NUM">10</field></shadow></value><statement name="DO"></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="232"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false"><value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="karel_turn_left"><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_place_stone"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="332"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'What sequence of actions does Karel need to repeat, and how often?',
  'What steps are involved for Karel to pick up the first stone? Make sure to use the function "turn right".'
]

class RepeatCorners extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 0; i < n-1; i++) {
      walls.push({r:(1),c:(i),d:'East'})
    }
    return walls
  }

  render() {
    var n = 5
    var stones = []
    for (var i = 1; i < n; i++) {
      stones.push({r:1,c:i,n:1})
    }

    var walls = this.makeWalls(n)

    let initXml = translateAllParts(initialXml, 'turn right')
    let solXml = translateAllParts(solutionXml, 'turn right')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use a REPEAT BLOCK to place a stone after each column')}.
          </span>}
          preWorld = {{
            width:300,
            height:300 * (2/n),
            nRows:2,
            nCols:n,
            walls:walls,
          }}
          postWorld = {{
            width:300,
            height:300 * (2/n) ,
            nRows:2,
            nCols:n,
            walls:walls,
            stones:stones,
            karelRow:1,
            karelCol:n - 1

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

export default RepeatCorners
