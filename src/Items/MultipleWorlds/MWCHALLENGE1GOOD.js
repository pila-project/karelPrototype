import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import IdeItem from 'Components/Templates/IdeItem.js'
import {translate} from 'redux/translator.js'
const WORLD_WIDTH = 280
const initialXml = `<xml><block type="karel_main" deletable="false" movable="false" editable="false" x="20" y="20"><statement name="program"></statement></block></xml>`
class PreTestA extends Component {

  getPreWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6,
    
    }
  }

  getPostWorld() {
    return {
      width:WORLD_WIDTH,
      height:WORLD_WIDTH,
      nRows:6,
      nCols:6
    }
  }

  render() {
    return (<div className="verticalContainer centered fullSize">
      <IdeItem
        instructions = {<span>
          <b>{translate('Example')}:</b>
          &nbsp;{translate('Example showing how to use feature / concept, or solve a similar task.')}!
        </span>}
        preWorld = {this.getPreWorld()}
        postWorld = {this.getPostWorld()}
        hideBlocks = {{
          'karel_while_dropdown':false,
          'karel_if_dropdown': false,
          'karel_procedure':true,
          'controls_repeat_ext':true,
        }}
        initialXml = {initialXml}
      />
    </div>)
  }



}

export default PreTestA
