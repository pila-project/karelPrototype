import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  return { studentState };
}

class DashboardItem extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Learn";
  }
  
  static defaultProps = {
    itemId: 'cmd1',
  }

  render() {
    return Curriculum.getComponent(this.props.itemId)
  }


}

export default connect(
  mapStateToProps
)(DashboardItem)
