import React from 'react';
import './App.css';
import DemoKarel from './Pages/DemoKarel.js'
import DemoBuilder from './Pages/DemoBuilder.js'
import TestKarel from './Pages/TestKarel.js'
import TestBuilder from './Pages/TestBuilder.js'
import StarterCode from './Pages/StarterCode.js'
import DashboardView from './Components/Dashboard/DashboardView.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Route exact path="/" component={TestKarel} />
        <Route exact path="/demoKarel" component={DemoKarel} />
        <Route exact path="/demoBuilder" component={DemoBuilder} />
        <Route exact path="/testKarel" component={TestKarel} />
        <Route exact path="/testBuilder" component={TestBuilder} />
        <Route exact path="/startercode" component={StarterCode} />
        <Route exact path="/dashboard" component={DashboardView} />
      </div>
    </Router>
  )
}

export default App;
