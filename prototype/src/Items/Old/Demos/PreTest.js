import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class PreTest extends Component {

  render() {
    return (
      <div className="verticalContainer">
        <h1>Pre-Test Description</h1>
        <br />

        <h3>What Students Do</h3>
        <ol>
          <li>Mentally trace execution of program and make predictions about behavior</li>
          <li>Follow-up questions about feelings of anxiety</li>
        </ol>
        
        <h3>What Is Measured</h3>
        <ol>
          <li>Measure prior knowledge</li>
          <li>Measure technical anxiety (Perhaps similar to math anxiety)</li>
        </ol>

        <h3>Uses for Outcome Measures</h3>
        <ol>
          <li>Categorize students by prior knowledge and adapt learning challenges accordingly</li>
          <li>Use technical anxiety as a covariate and try to neutralize with additional support and motivation</li>
        </ol>

        <h3>Additional Comments and Questions</h3>
        <ul>
          <li>We will also measure prior knowledge in-situ during next phase for validation</li>
          <li>Q: Can we get students' reading comprehension scores to use as covariates?</li>
          <li>Q: Can we get students' quant, etc. scores to use as covariates?</li>
        </ul>
      </div>
    )
  }
}

export default PreTest