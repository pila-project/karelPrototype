import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'

  
class KarelCommandsPlaceStone extends Component {

  componentWillMount() {
  }

  onMoveClick() {
    this.refs.world.move()
  }

  onPlaceClick() {
    this.refs.world.placeStone()
  }

  render() {
    return (<div className="verticalContainer centered">
      <h1>Karel can place a stone</h1>
      <KarelWorld 
        width = {200}
        height = {200}
        nRows = {2}
        nCols = {2}
        ref="world"
      />
      <div>
        <Button onClick = {() => this.onMoveClick()}>move</Button>
        <Button onClick = {() => this.onPlaceClick()}>placeStone</Button>
      </div>
    </div>)
  }

}

export default KarelCommandsPlaceStone