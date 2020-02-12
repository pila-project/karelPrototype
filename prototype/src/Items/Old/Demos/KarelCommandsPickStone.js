import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import KarelWorld from 'Components/Karel/KarelWorld.js'
import KarelGoal from 'Components/Karel/KarelGoal.js'


const WORLD_HEIGHT = 250
  
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
    return (<div className="verticalContainer centered testBody">
      <h1 style={{marginBottom:40,marginTop:40}}>Karel can <span style={{color:'blue'}}>pick stones</span></h1>
      <div className="horizontal centered" style={{marginBottom:20}}>
        <div>
          <h3>World:</h3>
          <KarelWorld 
            width = {WORLD_HEIGHT * 2.0/2.0}
            height = {WORLD_HEIGHT}
            nRows = {2}
            nCols = {2}
            stones = {[{r:1,c:1,n:1}]}
            ref="world"
          />
        </div>
        <div style={{width:100}}/>
        <div>
          <h3>Goal:</h3>
          <KarelGoal
            width = {WORLD_HEIGHT * 2.0/2.0}
            height = {WORLD_HEIGHT}
            nRows = {2}
            nCols = {2}
            karelCol = {1}
          />
        </div>
      </div>
      <div style={{marginTop:18}}>
         <Button 
            style={{marginRight:10}}
            size="lg" 
            onClick = {() => this.onMoveClick()}
          >move</Button>
         <Button 
            size="lg" 
            onClick = {() => this.onPickClick()}
          >pick stone</Button>
      </div>
    </div>)
  }

  

}

export default KarelCommandsPickStone