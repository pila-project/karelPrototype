import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="controls_repeat_ext" deletable="false" movable="false" editable="false"><value name="TIMES"><shadow type="math_number" editable="false"><field name="NUM">7</field></shadow></value><statement name="DO"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="turn right"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></statement></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="232"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`
class Item extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 1; i < n; i++) {
      walls.push({r:(n-i),c:(i),d:'North'})
      walls.push({r:(n-i),c:(i-1),d:'East'})
    }
    return walls
  }

  render() {
    var n = 8

    var walls = this.makeWalls(n)
    let xml = translateAllParts(initialXml, 'turn right')
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Good Example')}:</b>
            &nbsp;{translate('This program uses a repeat with several commands')}.
          </span>}
          preWorld = {{
            width:300,
            height:300,
            nRows:n,
            nCols:n,
            walls:walls
          }}
          postWorld = {{
            width:300,
            height:300,
            nRows:n,
            nCols:n,
            walls:walls,
            karelRow:0,
            karelCol:n - 1
          }}
          initialXml = {xml}
          hasRun={true}
          hasStep={false}
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
