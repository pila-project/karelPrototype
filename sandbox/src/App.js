import React from 'react';
import './App.css';
import Demo from './Pages/Demo.js'
import Rich from './Pages/Rich.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Demo} />
        <Route exact path="/rich" component={Rich} />
      </div>
    </Router>
  )
}

export default App;
