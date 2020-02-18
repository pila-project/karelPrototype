import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import UpTextArrow from 'Components/Util/UpTextArrow.js'
import UpLeftTextArrow from 'Components/Util/UpLeftTextArrow.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'
import { withTranslation } from 'react-i18next';
const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_place_stone" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"><next><block type="karel_move" deletable="false" movable="false" editable="false"></block></next></block></next></block></next></block></statement></block></xml>`
class ProgramsA extends Component {

  render() {
    return (
      <div className="vertical centered testBody">
        <h1 style={{marginBottom:20,marginTop:0}}>You can <span className="blue">program</span> Karel:</h1>
      
        <ExampleCode
          world = {{
            width:300,
            height:300,
            nRows:4,
            nCols:4
          }}
          initialXml = {initialXml}
        >
        </ExampleCode>
        <span style={{
            position:'absolute',
            top: '520px',
            marginLeft: '-370px'
          }}>
          <UpTextArrow 
            text={'Hit the run button, and the program will run line by line.'}
          />
        </span>
        <span style={{
            position:'absolute',
            top: '190px',
            marginLeft: '270px'
          }}>
          <UpLeftTextArrow 
            text={'This is a program'}
          />
        </span>
        
      </div>
    )
  }

}

/*
<img style= {{
          position:'absolute',
          height:150,
          top:120,
          marginLeft:-60
          }}
          src={MsgProgram} />
        <img style= {{
          position:'absolute',
          height:150,
          top:370,
          marginLeft:-60,
          zIndex:999
          }}
          src={MsgRun} />
          */

export default ProgramsA