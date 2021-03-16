import React, { Component, Suspense } from 'react';
import {updateCurrentView, updateLocale} from 'redux/actions.js'
import { connect } from 'react-redux';
import { useParams } from "react-router";
import './App.css';
import './Pages/style/pages.css'
import StarterCode from './Pages/StarterCode.js'
import Dashboard from './Components/Dashboard/Dashboard.js'
import Learning from './Components/Learning/Learning.js'
import { ManageModules, Parson, Prolific, Experience1, Experience2, MultipleWorlds} from './Pages'
import DashboardItem from './Components/Dashboard/DashboardItem.js'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

require('dotenv').config()

// temporarily replicated in redux/translator.js
const LOCALE = 'en'; // options are {'en', 'fr'}

const mapDispatchToProps = {
  onUpdateLocale: (locale) => updateLocale(locale)
};

class App extends Component {

  constructor(props){
    super(props);
    this.props.onUpdateLocale(LOCALE);

  }

  render() {
    return (
      <Router>
      <div>
        <Suspense fallback={(<div>Loading</div>)}>
        <Route exact path="/prolific" component={ManageModules} />
        <Route exact path="/prolific/:userId" component={ManageModules} />
        <Route exact path="/experience1" component={ManageModules} />
        <Route exact path="/experience1/:userId" component={ManageModules} />
        <Route exact path="/experience2" component={ManageModules} />
        <Route exact path="/experience2/:userId" component={ManageModules} />
        <Route exact path="/parson" component={ManageModules} />
        <Route exact path="/parson/:userId" component={ManageModules} />
        <Route exact path="/multipleworlds" component={ManageModules} />
        <Route exact path="/multipleworlds/:userId" component={ManageModules} />
        <Route exact path="/startercode" component={StarterCode} />
        <Route exact path="/learning" component={Learning} />
        <Route exact path="/item" component={DashboardItem} />
        {/* <Route exact path="/reduxTest" component={ReduxTest} /> */}
        </Suspense>
      </div>
    </Router>
    )
  }
}

export default connect(null, mapDispatchToProps)(App)
