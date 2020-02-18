import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'
import KarelCommands from 'Components/Templates/KarelCommands.js'
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
const WORLD_SIZE = 250
  
class KarelCommandsTurnLeft extends Component {

  render() {
    const translate = this.props.t
    const title = translate('KarelCanTurnLeft')

    return <KarelCommands
      title = {<h1>{title}</h1>}
      preWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
      }}
      postWorld = {{
        nRows:2,
        nCols:2,
        width:250,
        height:250,
        karelDir:'North'
      }}
      hasMove = {false}
      hasPickStone = {false}
      hasPlaceStone ={false}
    />
  }

}

export default connect(
  null,
  null
)(withTranslation()(KarelCommandsTurnLeft))