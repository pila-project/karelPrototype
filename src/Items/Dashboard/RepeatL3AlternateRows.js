import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate, translateAllParts} from 'redux/translator.js'

const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="true" x="20" y="20"><statement name="program"></statement></block></xml>`
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

    let xml = translateAllParts(initialXml, 'turn right')

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

export default RepeatCorners
