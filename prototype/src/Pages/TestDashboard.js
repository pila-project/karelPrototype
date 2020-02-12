import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'

import DashboardView from '../Components/Dashboard/DashboardView.js'

class TestDashboard extends Component {

  componentWillMount() {
    this.setState({
      currPage:{
        stage:'learning',
        id:'5'
      }
    })
  }

  onSelectItem(e) {
    this.setState({
      view: e
    })
  }
 
  render() {
    return (

      <DashboardView 
        onSelectItem = {(e) => this.onSelectItem(e)}
      />

    )
  }
}

export default TestDashboard