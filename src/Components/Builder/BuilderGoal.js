import React, { Component } from 'react';
import './style/builder.css'
import BuilderWorld from './BuilderWorld.js'

class BuilderGoal extends Component {
  render() {
    return <div>
      <BuilderWorld 
        {...this.props}
      />
      <div 
        style={{
          width:this.props.width,
          height:this.props.height,
          backgroundColor:'white',
          position:'absolute',
          marginTop:-this.props.height,
          opacity:0.6
        }}
      />
    </div>
  }
}

export default BuilderGoal