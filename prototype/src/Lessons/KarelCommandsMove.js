import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Skin from '../Img/skin4.jpg'
import KarelWorld from '../Components/Karel/KarelWorld.js'

  
class KarelCommandsMove extends Component {

  componentWillMount() {
  }

  onMoveClick() {
    this.refs.world.move()
  }

  render() {
    return (<div className="verticalContainer centered">
      <h1>Karel can move</h1>
      <KarelWorld 
        width = {200}
        height = {200}
        nRows = {2}
        nCols = {2}
        ref="world"
      />
      <Button onClick = {() => this.onMoveClick()}>move</Button>
    </div>)
  }

}

export default KarelCommandsMove