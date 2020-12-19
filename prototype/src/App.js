import React, { Component, Suspense } from 'react';
import {updateCurrentView, updateLocale} from 'redux/actions.js'
import { connect } from 'react-redux';
import { useParams } from "react-router";
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

// temporarily replicated in redux/translator.js
const LOCALE = 'en'; // options are {'en', 'fr'}

const mapDispatchToProps = {
  onUpdateLocale: (locale) => updateLocale(locale)
};

class App extends Component {

  constructor(props){
    super(props);
    this.props.onUpdateLocale(LOCALE);

    console.log('we are in App now')
  }

  render() {
    return (
      <Router>
      <div>
        <Suspense fallback={(<div>Loading</div>)}>
        <Route exact path="/" component={GuineaExp} />
        <Route exact path="/:userId" component={GuineaExp} />
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
