import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="true" editable="true" x="20" y="20"><statement name="program"><block type="procedures_callnoargsnoreturn" deletable='false' movable="false"><mutation name="bury stone"></mutation><next><block type="karel_move" deletable='false' movable="false"><next><block type="procedures_callnoargsnoreturn" deletable='false' movable="false"><mutation name="bury stone"></mutation></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="true" editable="true" x="20" y="280"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable='false' movable="false"><next><block type="karel_turn_left" deletable='false' movable="false"><next><block type="karel_turn_left" deletable='false' movable="false"></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="true" editable="true" x="20" y="580"><field name="NAME">bury stone</field><statement name="STACK"></statement></block></xml>`

const solutionXml = `<xml><block type="karel_main" deletable="false" x="20" y="20"><statement name="program"><block type="procedures_callnoargsnoreturn" deletable="false" movable="false"><mutation name="bury stone"></mutation><next><block type="karel_move" deletable="false" movable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false"><mutation name="bury stone"></mutation></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="155"><field name="NAME">turn right</field><statement name="STACK"><block type="karel_turn_left" deletable="false" movable="false"><next><block type="karel_turn_left" deletable="false" movable="false"><next><block type="karel_turn_left" deletable="false" movable="false"></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="291"><field name="NAME">bury stone</field><statement name="STACK"><block type="karel_pickup_stone"><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"><next><block type="karel_turn_left"><next><block type="karel_place_stone"><next><block type="karel_turn_left"><next><block type="karel_move"><next><block type="procedures_callnoargsnoreturn"><mutation name="turn right"></mutation><next><block type="karel_move"></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`

const hintMessages = [
  'does this work?',
  'this seems to work'
]

class Item extends Component {

  render() {
    // replace all...

    let initXml = translateAllParts(initialXml, 'turn right')
    let solXml = translateAllParts(solutionXml, 'turn right')


    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('This program has karel pick up a stone and move it around a corner. It creates a new command to "turn right". Fill in the remaining blocks in the FUNCTION BLOCK')}:
          </span>}
          preWorld = {{
            width:350,
            height:130,
            nRows:2,
            nCols:6,
            karelRow: 0,
            karelCol: 0,
            karelDir: 'East',
            walls:[
              {r:0,c:0,d:'South'},
              {r:1,c:1,d:'East'},
              {r:1,c:1,d:'South'},
              {r:1,c:0,d:'East'},
              {r:0,c:2,d:'South'},
              {r:0,c:3,d:'South'},
              {r:1,c:3,d:'East'},
              {r:1,c:4,d:'South'},
              {r:1,c:4,d:'East'},
              {r:0,c:5,d:'South'},
            ],
            stones:[
              {r:0,c:0,n:1},
              {r:0,c:3,n:1}
            ],
          }}
          postWorld = {{
            width:350,
            height:130,
            nRows:2,
            nCols:6,
            karelRow: 0,
            karelCol: 5,
            karelDir: 'East',
            walls:[
              {r:0,c:0,d:'South'},
              {r:1,c:1,d:'East'},
              {r:1,c:1,d:'South'},
              {r:1,c:0,d:'East'},
              {r:0,c:2,d:'South'},
              {r:0,c:3,d:'South'},
              {r:1,c:3,d:'East'},
              {r:1,c:4,d:'South'},
              {r:1,c:4,d:'East'},
              {r:0,c:5,d:'South'},
            ],
            stones:[
              {r:1,c:1,n:1},
              {r:1,c:4,n:1}
            ],
          }}
          initialXml={initXml}
          solutionXml={solXml}
          hints={hintMessages}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_if_dropdown': true
          }}
        />
      </div>
    )
  }

}

export default Item
