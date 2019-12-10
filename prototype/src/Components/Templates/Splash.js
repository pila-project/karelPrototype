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
            <div className="vertical">
              <div style={{
                color:'white',
                width:800,
                height:150,
                textAlign:'center',
                fontSize:36
              }}> 
                {this.props.text}
              </div>
              <div style={{
                color:'grey',
                width:800,
                height:150,
                textAlign:'center',
                fontSize:24
              }}> 
                {this.props.subText}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Splash