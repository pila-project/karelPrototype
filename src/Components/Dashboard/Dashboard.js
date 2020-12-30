import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';
import {updateCurrentView, updateItem, endSession, updateCountdown} from 'redux/actions.js'
import { connect } from 'react-redux';
import { idToComponent } from 'constants'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import Logo from "Img/pisa.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RightTextArrow from 'Components/Util/RightTextArrow.js'
import {translate} from 'redux/translator.js'

import { faLock } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { withTranslation } from 'react-i18next';

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  const countdown = state.countdown;
  const points = state.points;
  return { studentState, countdown, points };
}

const mapDispatchToProps = {
  onUpdateCurrentView: (view) => updateCurrentView(view),
  onUpdateItem: (item) => updateItem(item),
  onEndSession: () => endSession(),
  onUpdateCountdown: (time) => updateCountdown(time)
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
        marginLeft: 120,
      }}>
        <RightTextArrow
          text={translate('Click to work on a challenge')}
        />
      </span>
    )
  }

  renderBigChallenge(unit) {
    let challengeId = unit['problems'][0]['challenge']
    return (
      <Button
      className="bigChallengeBtn"
      onClick = {() => this.selectItem(challengeId)}
      >
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

  isFirstTime(){
    let firstProblem = Curriculum.getLearning()[0]['problems'][0]
    let challengeId = firstProblem['challenge']
    return !this.isComplete(challengeId)
  }

  selectItem(itemId){
    let item = Curriculum.getProblemFromId(itemId)
    this.props.onUpdateItem(item['name'])
    this.props.onUpdateCurrentView(itemId)

    var time_obj = {}
    if (this.props.countdown == {}) {
      time_obj[item['name']] = 600
    } else if (item['name'] in this.props.countdown) {
      time_obj[item['name']] = this.props.countdown[item['name']]
    } else {
      time_obj[item['name']] = 600
    }
    this.props.onUpdateCountdown(time_obj);

  }

  renderDashboardRow(unit, index) {
    if('isChallenge' in unit) {
      return this.renderBigChallenge(unit, index)
    }
    return <div key={index}>{this.renderUnit(unit)}</div>
  }

  renderProblem(unit, problem, index) {
    let locked = this.isLocked(problem)
    let challengeId = problem['challenge']

    let complete = this.isComplete(challengeId)
    return (
      <span
        key={challengeId + '-btn'}
        class={"alignedVertical " + this.padLeft(index)}
      >
        {
          complete && <span className="completeRing"/>
        }
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

  isComplete(challengeId) {
    if(!(challengeId in this.props.studentState)) {
      return false
    }
    let value = this.props.studentState[challengeId]
    let status = value['status']
    return status === 'completed'
  }

  isLocked(problem) {
    // build a map of problems done from the redux "studentState"
    // Note: there is a constant I didn't use for "completed" (no time)
    let problemsDone = {}
    for(var key in this.props.studentState) {
      let value = this.props.studentState[key]
      let status = value['status']
      if(status === 'completed' || status === 'timedout') {
        let problem = Curriculum.getProblemFromId(key)
        console.log('problem')
        console.log(problem)
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
    var point_msg = '';
    if (this.props.points == 0) {
      point_msg = 'Click on the first unlocked activity.'
    } else {
      point_msg = 'Great work! You have earned ' + this.props.points.toString() + ' points. Click on the next activity.';
    }

    return (
      <div id="pointsDiv">
      {translate(point_msg)}
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
          {/*}<span className="timer">
            {/*<FontAwesomeIcon style={{'font-size':'30px'}}icon={faClock} /> 45mins
          </span> */}
          <Button
          className="endSessionBtn"
          onClick = {() => this.props.onEndSession() }
          >
            {translate('End Session')}
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Dashboard)
