import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import UpTextArrow from 'Components/Util/UpTextArrow.js'
import { withTranslation } from 'react-i18next';
import {translate} from 'redux/translator.js'
const WORLD_HEIGHT = 150

class CommandsA extends Component {

  renderPreWorld() {
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      stones: [{r:0,c:1,n:1}]
    }
  }

  renderPostWorld() {
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      karelCol:2
    }
  }

  render() {
    let title = translate('Karel can perform many commands')
    return <div>
      <KarelCommands
        title={<h1>{title}:</h1>}
        preWorld={this.renderPreWorld()}
        postWorld = {this.renderPostWorld()}
        hideBlocks = {{'karel_if_dropdown': false}}
      />
      <div style={{height:20}} />
      <span>
        <UpTextArrow
          text={<span>{translate('Use these buttons to make the World match the Goal')}</span>}
        />
      </span>
    </div>
  }
}

export default CommandsA
