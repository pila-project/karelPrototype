import React from 'react';
import './App.css';
import Demo from './Pages/Demo.js'
// import Tutorial from './Pages/Tutorial.js'
import BlocklyDemo from './Pages/BlocklyDemo.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Demo} />
        {/* <Route exact path="/tutorial" component={Tutorial} /> */}
        <Route exact path="/blockly" component={BlocklyDemo} />
      </div>
    </Router>
  )
}

export default App;
