import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></next></block></next></block></next></block></statement></block></xml>`
class Item extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
         instructions = {<span>
            <b>{translate('Bad Example')}:</b> 
            &nbsp;{translate('Although this program solves the problem, it is harder to read')}:
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
          initialXml={initialXml}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'controls_repeat_ext':true
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