import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'

  
class KarelCommandsTurnLeft extends Component {

  componentWillMount() {
  }

  onClick() {
    this.refs.world.turnLeft()
  }

  render() {
    return (<div className="verticalContainer centered">
      <h1>Karel can turn left</h1>
      <KarelWorld 
        width = {200}
        height = {200}
        nRows = {2}
        nCols = {2}
        ref="world"
      />
      <Button onClick = {() => this.onClick()}>turnLeft</Button>
    </div>)
  }

}

export default KarelCommandsTurnLeft