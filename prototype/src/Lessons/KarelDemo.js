import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import BlocklyDemo from '../Components/BlocklyDemo.js'


class KarelDemo extends Component {

  render() {
    return (
      <div className="verticalContainer">
        <BlocklyDemo /> 
      </div>
    )
  }
}

export default KarelDemo