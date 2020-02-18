import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';
import {updateCurrentView} from 'redux/actions.js'
import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RightTextArrow from 'Components/Util/RightTextArrow.js'

import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  return { studentState };
}

const mapDispatchToProps = {
  onUpdateCurrentView: (view) => updateCurrentView(view)
};

class Dashboard extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Dashboard";
  }

  render() {
    return (
      <div>
        {this.renderNav()}
        <div className="displayOuter">
          <div className="displayInner">
            {this.renderFirstTimeInstructions()}
            {this.renderUnitsRows()}
            <div style={{height:30}} />
            <hr/>
            <div style={{height:30}} />
          </div>
        </div>
      </div>
    )
  }

  renderFirstTimeInstructions() {
    if(!this.isFirstTime()) return <span />
    return (
      <span style={{
        position:'absolute',
        marginTop: 50,
        marginLeft: 150,
      }}>
        <RightTextArrow 
          text={'Click to work on a challenge'}
        />
      </span>
    )
  }

  isFirstTime(){
    return true
  }

  renderBigChallenge(unit) {
    const translate = this.props.t;
    return (
      <Button className="bigChallengeBtn">
        {translate(unit['unitName'])}
      </Button>

    )
  }

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

  selectItem(itemId){
    this.props.onUpdateCurrentView(itemId)
  }

  renderDashboardRow(unit, index) {
    if('isChallenge' in unit) {
      return this.renderBigChallenge(unit, index)
    }
    return <div key={index}>{this.renderUnit(unit)}</div>
  }

  renderProblem(unit, problem, index) {
    let locked = this.isLocked(problem)
    const translate = this.props.t; // t is for translation
    let challengeId = problem['challenge']
    return (
      <span 
        key={challengeId + '-btn'} 
        class={"alignedVertical " + this.padLeft(index)}
      >
        <Button onClick = {() => this.selectItem(challengeId)} className={"unitIcon " + unit['iconId']} />
        {
          locked &&
            <span className="lockedCover1">
              <FontAwesomeIcon style={{'font-size':'30px'}}icon={faLock} />
              <span className="lockedCover2"></span>
            </span>
        }
        <span>{translate(problem['name'])}</span>
      </span>
    )
  }

  renderUnit(unit) {
    let problems = unit['problems']
    return (
      <div className="unit alignedHorizontal">
        {problems.map((problem, index) =>
          {return this.renderProblem(unit, problem, index)}
        )}
      </div>
    )
  }

  isLocked(problem) {
    // build a map of problems done from the redux "studentState"
    // Note: there is a constant I didn't use for "completed" (no time)
    let problemsDone = {}
    for(var key in this.props.studentState) {
      let value = this.props.studentState[key]
      let status = value['status']
      if(status === 'completed') {
        let problem = Curriculum.getProblemFromId(key)
        let name = problem['name']
        problemsDone[name] = true
      }
    }
    return Curriculum.isLocked(problemsDone, problem)
  }

  padLeft(i) {
    if(i == 0) {return ' '}
    return 'unitBtnPadLeft'
  }

  renderPoints() {
    const translate = this.props.t;
    return (
      <div id="pointsDiv">
      {translate('Great work! You have earned 100 points. Click on an activity!')}
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
  mapStateToProps, mapDispatchToProps
)(withTranslation()(Dashboard))