import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelWorld from '../Components/Karel/KarelWorld.js'
import KarelGoal from '../Components/Karel/KarelGoal.js'


const WORLD_SIZE = 150
  
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
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}>Karel can <span style={{color:'blue'}}>place stones</span></h1>
      <div className="horizontal centered" style={{marginBottom:20}}>
        <div>
          <h3>World:</h3>
          <KarelWorld 
            width = {WORLD_SIZE}
            height = {WORLD_SIZE}
            nRows = {1}
            nCols = {1}
            ref="world"
          />
        </div>
        <div style={{width:100}}/>
        <div>
          <h3>Goal:</h3>
          <KarelGoal
            width = {WORLD_SIZE}
            height = {WORLD_SIZE}
            nRows = {1}
            nCols = {1}
            stones = {[{r:0,c:0,n:1}]}
          />
        </div>
      </div>
      <div style={{marginTop:18}}>
         <Button 
            size="lg" 
            onClick = {() => this.onPlaceClick()}
          >place stone</Button>
      </div>
    </div>)
  }

  

}

export default KarelCommandsPlaceStone