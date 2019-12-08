import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'

  
class KarelCommandsPickStone extends Component {

  componentWillMount() {
  }

  onMoveClick() {
    this.refs.world.move()
  }

  onPickClick() {
    this.refs.world.pickStone()
  }

  render() {
    return (<div className="verticalContainer centered">
      <h1>Karel can pick a stone</h1>
      <KarelWorld 
        width = {200}
        height = {200}
        nRows = {2}
        nCols = {2}
        stones = {[
          {r:1,c:1,n:1}
        ]}
        ref="world"
      />
      <div>
        <Button onClick = {() => this.onMoveClick()}>move</Button>
        <Button onClick = {() => this.onPickClick()}>pickStone</Button>
      </div>
    </div>)
  }

}

export default KarelCommandsPickStone