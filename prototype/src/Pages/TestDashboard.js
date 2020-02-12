import React, { Component } from 'react'
import { connect } from 'react-redux';
import { updateCurrentID } from '../redux/actions';

import DashboardView from '../Components/Dashboard/DashboardView.js'

const mapDispatchToProps = {
  onUpdateCurrentID: (id) => updateCurrentID(id)
};

class TestDashboard extends Component {

  componentWillMount() {
    this.props.onUpdateCurrentID('item5');
    // this.setState({
    //   view:'item5'
    // })
  }

  onSelectItem(e) {
    this.props.onUpdateCurrentID(e);
    // this.setState({
    //   view: e
    // })
  }
 
  render() {
    return (
      <DashboardView
        onSelectItem = {(e) => this.onSelectItem(e)}
      />
    )
  }
}

export default connect(
  null,
  mapDispatchToProps
)(TestDashboard)