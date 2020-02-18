import React, { Component } from 'react'

import ExampleCode from 'Components/Templates/ExampleCode.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import MsgProgram from 'Img/thisIsProgram.png'
import MsgRun from 'Img/hitRunButton.png'

import AnimatedVideo from 'Video/howToCode.mp4'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

const initialXml = ''
class AnimatedProgram extends Component {

  renderVideo() {
    return <video width="1200" height="560" controls autoplay>
      <source src={AnimatedVideo} type="video/mp4"></source>
      Your browser does not support the video tag.
    </video>
  }

  renderStarter() {
    return <IdeItem
          instructions = {<span className="horizontal spaceBetween">
            <span>
              <b>Learn:</b> Program by dragging "blocks".
            </span>
            <div>
              <FontAwesomeIcon 
                icon={faQuestionCircle}
              />
            </div>
          </span>}
          preWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4
          }}
          postWorld = {{
            width:300,
            height:300 / 4.0,
            nRows:1,
            nCols:4,
            karelCol:3,
            stones:[
              {r:0,c:1,n:1},
              {r:0,c:2,n:1}
            ]
          }}
          initialXml = {initialXml}
        />
  }

  render() {
    return (
      <div className="vertical centered testBody">
        {this.renderVideo()}
        
      </div>
    )
  }

}

export default AnimatedProgram