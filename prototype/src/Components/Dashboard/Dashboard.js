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

const EXAMPLE_STUDENT_STATE = {
  cmd1: {
    isDone:true,
    code:`<xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="karel_main" deletable="false" movable="false" x="10" y="10"></block>
              </xml>`
  }
}

class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Dashboard";
  }
  
  static defaultProps = {
    studentState: EXAMPLE_STUDENT_STATE
  }

  render() {

    return (
      <div>
        {this.renderNav()}
        <div className="displayOuter">
          <div className="displayInner">
            
            {this.renderUnitsTable()}
            {this.renderBigChallenge()}
            <div style={{height:30}} />
          </div>
        </div>
      </div>
    )
  }

  renderBigChallenge() {
    return (
      <Button className="bigChallengeBtn">
        Big Challenge Problem
      </Button>

    )
  }

  renderUnitsTable() {
    return (
      <div>
        <table className="table" style={{marginBottom:0}}>
          <thead>
            <th className="col1">Challenge</th>
            <th>Worked Examples</th>
          </thead>
        </table>
        {this.renderUnitsRows()}
      </div>

    )
  }

  renderUnitsRows() {
    let curriculum = Curriculum.getLearning()
    return (
      <div>
        {curriculum.map((unit, index) =>
          <div key={index}>{this.renderUnit(unit)}</div>
        )}
      </div>
    )
  }

  renderUnit(unit) {
    return (
      <div className="col1 alignedVertical">
        <Button className="unitIcon"
          id={unit['iconId']}
        >
        </Button>
        <span>{unit['unitName']}</span>
      </div>
    )
  }

  renderPoints() {
    return (
      <div id="pointsDiv">
      Great work! You have earned 100 points. Click on an activity!
      </div>
    )
  }

  renderNav() {
    return (
      <div className="boxContainer">
        <div className="box">
          <span>
            <img src={Logo} className="dashboardLogo"/>
            </span>
        </div>
        <div className="box">
          <span>
          {this.renderPoints()}
          </span>
        </div>
        <div className="box">
          <span className="timer">
          Time left: 45mins
          </span>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Dashboard)