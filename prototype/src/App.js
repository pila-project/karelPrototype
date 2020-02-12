import React from 'react';
import './App.css';
import DemoKarel from './Pages/DemoKarel.js'
import DemoBuilder from './Pages/DemoBuilder.js'
import TestKarel from './Pages/TestKarel.js'
import StarterCode from './Pages/StarterCode.js'
import TestDashboard from './Pages/TestDashboard.js'
import DashboardView from './Components/Dashboard/DashboardView.js'
import DashboardItem from './Components/Dashboard/DashboardItem.js'
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
        <Route exact path="/testDashboard" component={TestDashboard} />
        <Route exact path="/startercode" component={StarterCode} />
        <Route exact path="/dashboard" component={DashboardView} />
        <Route exact path="/item" component={DashboardItem} />
        {/* <Route exact path="/reduxTest" component={ReduxTest} /> */}
      </div>
    </Router>
  )
}

export default App;
