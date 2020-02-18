import React, { Suspense } from 'react';
import './App.css';
import './Pages/style/pages.css'
import StarterCode from './Pages/StarterCode.js'
import Dashboard from './Components/Dashboard/Dashboard.js'
import Learning from './Components/Learning/Learning.js'
import GuineaExp from './Pages/GuineaExp.js'
import DashboardItem from './Components/Dashboard/DashboardItem.js'
import {
  HashRouter as Router,
  Route
} from 'react-router-dom'

function App() {
  return (
    <Router>
      <div>
        <Suspense fallback={(<div>Loading</div>)}>
        <Route exact path="/" component={GuineaExp} />
        <Route exact path="/startercode" component={StarterCode} />
        <Route exact path="/learning" component={Learning} />
        <Route exact path="/item" component={DashboardItem} />
        {/* <Route exact path="/reduxTest" component={ReduxTest} /> */}
        </Suspense>
      </div>
    </Router>
  )
}

export default App;
