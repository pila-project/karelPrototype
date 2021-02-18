import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'


const initialXml = ''
class Repeat9 extends Component {

  render() {
    return (
      <div className="vertical centered fullSize">
        <IdeItem
          instructions = {<span>
            <b>{translate('Challenge')}:</b>
            &nbsp;{translate('Use a repeat to place 9 stones')}.
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
            stones:[{r:2,c:1,n:9}]
          }}
          hasRun={true}
          hasStep={false}
          hideBlocks = {{
            'karel_while_dropdown':true,
            'karel_if_dropdown': true
          }}
        />
      </div>
    )
  }

}

export default Repeat9
