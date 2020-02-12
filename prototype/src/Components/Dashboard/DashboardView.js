import React, { Component } from 'react';

import './DashboardView.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

import { connect } from 'react-redux';
import CommandsA from '../../Tests/CommandsA';
import { isUnitUnlocked } from '../../Minions/IsLocked';

import Logo from "../../Img/pisa.jpeg";

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  return { studentState };
}



const EXAMPLE_CURRICULA = [
  {
    unitName:'Commands',
    iconId:'egg',
    problem: [
      {
        id:'cmd1',
        component:<div />
      }
    ],
    workedExamples : [
      {
        id:'exCmd1',
        component:<div />
      },
      {
        id:'exCmd2',
        component:<div />
      }
    ]
  },
  {
    unitName:'Teach Karel',
    iconId:'hatch',
    problem: [
      {
        id:'teach1',
        component:<div />,
      }
    ],
    workedExamples : [
      {
        id:'exTeach1',
        component:<div />
      },
      {
        id:'exTeach2',
        component:<div />
      }
    ]
  },
  {
    unitName:'Loops Lv1',
    iconId:'hatch',
    problem: [
      {
        id:'teach1',
        component:<div />,
      }
    ],
    workedExamples : [
      {
        id:'exTeach1',
        component:<div />
      },
      {
        id:'exTeach2',
        component:<div />
      }
    ]
  },
  {
    unitName:'Loops Lv2',
    iconId:'hatch',
    problem: [
      {
        id:'teach1',
        component:<div />,
      }
    ],
    workedExamples : [
      {
        id:'exTeach1',
        component:<div />
      },
      {
        id:'exTeach2',
        component:<div />
      }
    ]
  },
]

const EXAMPLE_STUDENT_STATE = {
  cmd1: {
    isDone:true,
    code:`<xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="karel_main" deletable="false" movable="false" x="10" y="10"></block>
              </xml>`
  }
}

class DashboardView extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Dashboard";
  }
  
  static defaultProps = {
    curriculum: EXAMPLE_CURRICULA,
    studentState: EXAMPLE_STUDENT_STATE
  }

  render() {

    console.log(this.props.curriculum)

    return (
      <div>
        {this.renderNav()}
        <div className="displayOuter">
          <div className="displayInner">
            {this.renderPoints()}
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
    let unit = EXAMPLE_CURRICULA[0]
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
    // let unit = EXAMPLE_CURRICULA[0]
    // return this.renderUnit(unit)
    return (
      <div>
        {EXAMPLE_CURRICULA.map((unit, index) =>
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
      <div className="dashboardNav">
        <div>
          <img src={Logo} className="dashboardLogo"/>
        </div>
        <div className="middleNav">
          <span className="timer">
          Learning Dashboard
          </span>
        </div>
        <div className="rightNav">
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
)(DashboardView)
