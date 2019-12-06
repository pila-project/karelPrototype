import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import Skin from '../Img/skin4.jpg'

class Intro extends Component {

  render() {
    return (
      <div className="verticalContainer">
        <img src={Skin} className="bigImg"/>
        <div style={{marginTop:'10px'}}>
          <Button style={{marginRight:'10px'}}>Cancer</Button>
           <Button>Not Cancer</Button>
        </div>
      </div>
    )
  }
}

export default Intro