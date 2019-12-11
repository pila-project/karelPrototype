import React from 'react';
import './App.css';
import Demos from './Pages/Demos.js'
import Test from './Pages/Test.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={Demos} />
        <Route exact path="/test" component={Test} />
      </div>
    </Router>
  )
}

export default App;
