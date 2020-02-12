import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class PostTest extends Component {

  render() {
    return (
      <div className="verticalContainer">
      <h1>Post-Test Description</h1>
        <br />

        <h3>What Students Do</h3>
        <ol>
          <li>Open-ended challenges (Details?)</li>
          <li>Code prediction questions to match pretest</li>
          <li>Questions about feelings of anxiety</li>
        </ol>
        
        <h3>What Is Measured</h3>
        <ol>
          <li>Measure how much students are able to learn</li>
          <li>Measure changes in knowledge due to lesson</li>
          <li>Measure changes in technical anxiety</li>
        </ol>

        <h3>Uses for Outcome Measures</h3>
        <ol>
          <li>How far students get provides a measure of learning ability (among other things)</li>
          <li>Changes from pre to post on matched questions provides a measure of what students learned</li>
          <li>Changes from pre to post anxiety</li>
        </ol>

        <h3>Additional Comments and Questions</h3>
        <ul>
          <li>...</li>
        </ul>

      </div>
    )
  }
}

export default PostTest