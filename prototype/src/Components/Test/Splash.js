import React, { Component } from 'react';

class Splash extends Component {

  render() {
    return (
      <div style={{
        width:'100vw',
        height:'100vh',
        backgroundColor:'black'
      }}>
        <div className="vertical centered fullSize" >
          <div className="horizontal centered fullSize" style={{
            justifyContent:'space-around'}}>
            <div style={{
              color:'white',
              width:200,
              height:200,
              textAlign:'center',
              fontSize:36
            }}> 
              {this.props.text}
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Splash