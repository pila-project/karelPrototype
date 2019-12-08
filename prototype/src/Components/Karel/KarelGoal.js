import React, { Component } from 'react';
import './style/karel.css'
import KarelWorld from './KarelWorld.js'

class KarelGoal extends Component {
  render() {
    return <div>
      <KarelWorld 
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

export default KarelGoal