import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'


const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="place 2"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="procedures_callnoargsnoreturn" deletable="false" movable="false" editable="false"><mutation name="place 2"></mutation><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" movable="false" editable="false" x="20" y="205"><field name="NAME">place 2</field><statement name="STACK"><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    let xml = translateAllParts(initialXml, 'place 2')
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Good Example')}:</b>
            &nbsp;{translate('Once "place 2" is defined we can use the command as much as we like')}.
          </span>}
          preWorld = {{
            width:300,
            height:150,
            nRows:2,
            nCols:4,
          }}
          postWorld = {{
            width:300,
            height:150,
            nRows:2,
            nCols:4,
            stones:[
              {r:1,c:1,n:2},
              {r:1,c:2,n:2},
            ],
            karelCol:3
          }}
          initialXml={xml}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true,
            'karel_if_dropdown': true
          }}
          examples = {[
            'Good Example',
            'Bad Example'
          ]}
          isEditable={false}
        />
      </div>
    )
  }

}

export default Item
