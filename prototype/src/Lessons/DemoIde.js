import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import KarelIde from '../Components/Karel/KarelIde.js'

class DemoIde extends Component {

  render() {
    return (
      <div className="vertical centered">
        <KarelIde 
          nRows = {2}
          nCols = {2}
          walls = {[
            {r:1,c:0,d:'North'}
          ]}
        />
      </div>
    )
  }
}

export default DemoIde