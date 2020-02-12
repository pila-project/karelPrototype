import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

import BuilderWorld from '../../Components/Builder/BuilderWorld.js'
import BuilderGoal from '../../Components/Builder/BuilderGoal.js'


const WORLD_SIZE = 450
  
class DemoBuilderCommands extends Component {

  static defaultProps = {
    hasMove: true,
    hasMoveUp: true,
    hasMoveDown: true,
    hasTurn:true,
    hasPlace: true,
  }

  componentWillMount() {
  }


  renderButtons() {
    console.log('render buttons')
    var buttons = []
    if(this.props.hasMove) {
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        key="1"
        onClick = {() => this.refs.world.move()}
      >move</Button>)
    }
    if(this.props.hasMoveUp){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        key="2"
        onClick = {() => this.refs.world.moveUp()}
      >up</Button>)
    }
    if(this.props.hasMoveDown){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        key="3"
        onClick = {() => this.refs.world.moveDown()}
      >down</Button>)
    }
    if(this.props.hasTurn){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        key="4"
        onClick = {() => this.refs.world.turn()}
      >turn</Button>)
    }
    if(this.props.hasPlace){
      buttons.push(<Button 
        className = "commandButton"
        size="lg" 
        key="5"
        onClick = {() => this.refs.world.placeBrick()}
      >place brick</Button>)
    }
    
    return (<div className="commandButtons">{buttons}</div>)
  }

  render() {
    return (<div className="vertical centered">
      <div className="horizontal centered">
        <div>
          <BuilderWorld 
            nRows={20}
            nCols ={20}
            width={WORLD_SIZE}
            height={WORLD_SIZE}
            ref="world"
          />
          
        </div>
      </div>
      <div style={{marginTop:38}}>
        {this.renderButtons()}
      </div>
    </div>)
  }

  

}

export default DemoBuilderCommands