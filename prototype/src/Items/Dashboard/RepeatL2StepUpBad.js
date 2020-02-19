import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="tourner à droite"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="tourner à droite"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="tourner à droite"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="380"><field name="NAME">tourner à droite</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"><next><block type="karel_turn_left" deletable="false" movable="false" editable="false"></block></next></block></next></block></statement></block></xml>`
class Item extends Component {

  makeWalls(n) {
    var walls = []
    for (var i = 1; i < n; i++) {
      walls.push({r:(n-i),c:i,d:'North'})
       walls.push({r:(n-i),c:(i-1),d:'East'})
    }
    return walls
  }

  render() {
    var n = 8

    var walls = this.makeWalls(n)

    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Bad Example')}:</b> 
            &nbsp;{translate("This program doesn't use a repeat")}.
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

export default Item