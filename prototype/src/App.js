import React from 'react';
import './App.css';
import Learn from './Pages/Learn.js'
import Test from './Pages/Test.js'
import StarterCode from './Pages/StarterCode.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Learn} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/startercode" component={StarterCode} />
      </div>
    </Router>
  )
}

export default App;
