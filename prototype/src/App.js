import React from 'react';
import './App.css';
import Learn from './Pages/Learn.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Learn} />
      </div>
    </Router>
  )
}

export default App;
