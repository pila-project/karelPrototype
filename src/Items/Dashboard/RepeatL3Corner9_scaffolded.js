import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"></statement></block><block type="procedures_defnoargsnoreturn" deletable="false" x="20" y="232"><field name="NAME">place 4</field><statement name="STACK"></statement></block></xml>`
class Item extends Component {

  render() {

    let xml = translateAllParts(initialXml, 'turn right')

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
          initialXml={xml}
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
