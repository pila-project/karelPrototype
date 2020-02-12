import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStatus } from '../redux/actions';
import { STATUS } from '../redux/constants.js';

import Button from 'react-bootstrap/Button';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'
import KarelCommands from '../Components/Templates/KarelCommands.js'

const mapDispatchToProps = {
  onUpdateStatus: (status) => updateStatus(status)
};

const WORLD_HEIGHT = 150
  
class CommandsA extends Component {
  constructor(props){
    super(props);
    this.testRedux = this.testRedux.bind(this);
  }

  renderPreWorld() {
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      stones: [{r:0,c:1,n:1}]
    }
  }

  testRedux(){
    this.props.onUpdateStatus(
      { status: STATUS.INPROGRESS, id: 'cmd1' }
    );
  }

  renderPostWorld() {
    setTimeout(this.testRedux, 3000);
    return {
      width: WORLD_HEIGHT * 3.0,
      height: WORLD_HEIGHT,
      nRows: 1,
      nCols: 3,
      karelCol:2
    }
  }

  render() {
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}></h1>
      <KarelCommands
        preWorld={this.renderPreWorld()}
        postWorld = {this.renderPostWorld()}
        hasMove = {true}
        hasTurnLeft = {true}
        hasPickStone = {true}
        hasPlaceStone = {true}
      />
    </div>)
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommandsA)