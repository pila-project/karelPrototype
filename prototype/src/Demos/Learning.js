import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';

class Learning extends Component {

  render() {
    return (
      <div className="verticalContainer">
      <h1>Lesson Description</h1>
        <br />

        <h3>What Students Do</h3>
        <ol>
          <li>Work through a series of examples and problems that incrementally teach CS concepts.</li>
          <ul>
            <li>Each concept will have three tabbed views: the problem, relevant examples, and resources (e.g., videos)</li>
            <li>Types of problems/exercises</li>
              <ul>
                <li>Completing partial examples</li>
                <li>Modifying existing code</li>
                <li>Make predictions about code execution</li>
                <li>Make changes to the environment so code executes correctly (e.g., clicking to add stones)</li>
              </ul>
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

        <h3>Example Instructional Sequence</h3>
          <ol>
            <li>Karel, Stone, World, Wall</li>
            <li>move(), turnLeft(), putBeeper(), pickBeeper()</li>
            <li>Programs as sequences of commands (no control flow)</li>
            <ul>
              <li>Change program so Karel moves three steps</li>
              <li>Change program so Karel gets to top of ledge</li>
              <li>Change program so Karel puts a stripe of stones without running into wall</li>
              <li>Change program so Karel picks up a stack of stones</li>
            </ul>
            <li>Functions</li>
            <ul>
              <li>Demo: turnRight()</li>
              <li>Demo: turnAround()</li>
            </ul>
            <li>Write a program from scratch</li>
            <ul>
              <li>Get the newspaper: First chance to measure knowledge of functions</li>
            </ul>
            <li>Repeat</li>
            <ul>
              <li>Demo: Put a beeper in each corner using repeat</li>
              <li>Write: Place 50 stones</li>
            </ul>
            <li>While and Special functions</li>
            <ul>
              <li>Demo: Use beepersPresent() to pick up an arbitrary number of beepers</li>
              <li>Write: Move forward until encountering a wall, no matter how big, by using frontIsClear()</li>
              <li>Change: Fix putBeeperLine() function by adding precondition putBeeper()</li>
              <li>Demo: Nested while loops to pick up any beepers on first row</li>
              <li>Write: Fill the entire world with beepers. Given putBeeperLine() to start. This is tricky with limited function set.</li>
            </ul>
            <li>If/Else Statements</li>
            <ul>
              <li>Demo: Use if/else to invert beepers</li>
              <li>Write: Rebuild columns found on the first row</li>
            </ul>
          </ol>
      </div>
    )
  }
}

export default Learning