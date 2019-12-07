import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';


class Learning extends Component {

  render() {
    return (
      <div className="verticalContainer">
      < h1>Lesson Description</h1>
        <br />

        <h3>What Students Do</h3>
        <ol>
          <li>Work through a series of examples and problems that incrementally teach CS concepts.</li>
          <ul>
            <li>Each concept will have three tabbed views: the problem, relevant examples, and resources (e.g., videos)</li>
          </ul>
        </ol>
        
        <h3>What Is Measured</h3>
        <ol>
          <li>During each problem</li>
          <ul>
            <li>Speed</li>
            <li>Accuracy</li>
            <li>Resources used</li>
            <li>Programs created and tested</li>
            <li>Debugging strategies (e.g., stepping through code, adding and removing blocks)</li>
          </ul>
        </ol>

        <h3>Uses for Outcome Measures</h3>
        <ol>
          <li>...</li>
        </ol>

        <h3>Additional Comments and Questions</h3>
        <ul>
          <li>...</li>
        </ul>
      </div>
    )
  }
}

export default Learning