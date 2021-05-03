import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" x="20" y="20"><statement name="program"><block type="karel_place_stone"><next><block type="karel_move"><next><block type="karel_place_stone"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_place_stone"><next><block type="karel_move"><next><block type="karel_place_stone"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_place_stone"><next><block type="karel_move"><next><block type="karel_place_stone"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" x="20" y="530"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left"><next><block type="karel_turn_left"><next><block type="karel_turn_left"></block></next></block></next></block></statement></block></xml>`
class RepeatCorners extends Component {


  render() {
    var n = 4
    var stones = []
    for (var i = 0; i < n-1; i++) {
      stones.push({r:i,c:i,n:1})
      stones.push({r:i,c:i+1,n:1})
    }

    var walls = ''

    let xml = translateAllParts(initialXml, 'turn right')

    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Bad Example')}:</b>
            &nbsp;{translate('Although this program solves the problem, it does not use a REPEAT block')}:
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:n,
            nCols:n,
            walls:walls,
            karelRow:0,
            karelCol:0
          }}
          postWorld = {{
            width:300,
            height:300 ,
            nRows:n,
            nCols:n,
            walls:walls,
            stones:stones,
            karelRow:n-1,
            karelCol:n-1

          }}
          hasRun={true}
          hasStep={false}
          initialXml={xml}
          isEditable={false}
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
