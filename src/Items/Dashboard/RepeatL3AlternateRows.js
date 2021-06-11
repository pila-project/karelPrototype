import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="procedures_callnoargsnoreturn"><mutation name="place 4"></mutation><next><block type="karel_move"><next><block type="karel_move"><next><block type="karel_turn_left"></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="232"><field name="NAME">place 4</field><statement name="STACK"><block type="controls_repeat_ext"><value name="TIMES"><shadow type="math_number"><field name="NUM">4</field></shadow></value><statement name="DO"><block type="karel_place_stone"></block></statement></block></statement></block></xml>`

const hintMessages = [
  'Start by first completing the function for placing four stones.',
  'Place a repeat loop inside the main block. What sequence of actions needs to be repeated, and how many times?'
]

class RepeatCorners extends Component {


  render() {
    var n = 6
    var stones = []
    for (var i = 1; i < n; i++) {
      if (i%2==1) {
        stones.push({r:1,c:i,n:1})
      //} else {
        stones.push({r:0,c:i,n:1})
      }
    }

    var walls = ''

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
            height:300 * (2/(n+1)),
            nRows:2,
            nCols:n+1,
            walls:walls,
          }}
          postWorld = {{
            width:300,
            height:300 * (2/(n+1)) ,
            nRows:2,
            nCols:n+1,
            walls:walls,
            stones:stones,
            karelRow:1,
            karelCol:n

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
