import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import { isLocked } from 'Curriculum/IsLocked.js'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

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
            {this.renderUnitsRows()}
            <div style={{height:30}} />
            <hr/>
            <div style={{height:30}} />
          </div>
        </div>
      </div>
    )
  }

  renderBigChallenge(unit) {
    return (
      <Button className="bigChallengeBtn">
        {unit['unitName']}
      </Button>

    )
  }

  // renderUnitsTable() {
  //   return (
  //     <div>
  //       <table className="table" style={{marginBottom:0}}>
  //         <thead>
  //           <th className="col1">Challenge</th>
  //           <th>Worked Examples</th>
  //         </thead>
  //       </table>
        
  //     </div>

  //   )
  // }

  renderUnitsRows() {
    let curriculum = Curriculum.getLearning()
    return (
      <div class="alignedVertical">
        {curriculum.map((unit, index) =>
          {return this.renderDashboardRow(unit, index)}
        )}
      </div>
    )
  }

  renderDashboardRow(unit, index) {
    if('isChallenge' in unit) {
      return this.renderBigChallenge(unit, index)
    }
    return <div key={index}>{this.renderUnit(unit)}</div>
  }

  renderItem(unit, item, index) {
    let itemId = item['itemId']
    let curriculum = Curriculum.getLearning()
    let locked = isLocked(curriculum, this.props.studentState, item)
    return (
      <span 
        key={itemId + '-btn'} 
        class={"alignedVertical " + this.padLeft(index)}
      >
        <Button className={"unitIcon " + unit['iconId']} />
        {
          locked &&
            <span className="lockedCover1">
              <FontAwesomeIcon style={{'font-size':'30px'}}icon={faLock} />
              <span className="lockedCover2"></span>
            </span>
        }
        <span>{item['name']}</span>
      </span>
    )
  }

  renderUnit(unit) {
    let problems = unit['problems']
    return (
      <div className="unit alignedHorizontal">
        {problems.map((item, index) =>
          {return this.renderItem(unit, item, index)}
        )}
      </div>
    )
  }

  padLeft(i) {
    if(i == 0) {return ' '}
    return 'unitBtnPadLeft'
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
            <FontAwesomeIcon style={{'font-size':'30px'}}icon={faClock} /> 45mins
          </span>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps
)(Dashboard)