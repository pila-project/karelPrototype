import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommandsA from '../../Tests/CommandsA';
import { isUnitUnlocked } from '../../Minions/IsLocked';

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  return { studentState };
}

class DashboardView extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    document.title = "PISA 2024 Dashboard";
  }

  static defaultProps = {
    curriculum: [
      {
        unitName:'Commands',
        problems: [
          {
            id:'cmd1',
            component:<CommandsA />
          },
          {
            id:'cmd2',
            component:<CommandsA />
          }
        ],
        workedExamples : [
          {
            id:'exCmd1',
            component:<CommandsA />
          },
          {
            id:'exCmd2',
            component:<CommandsA />
          }
        ]
      }
    ]
  }

  render() {
    let studentInfo = [];
    for (const property in this.props.studentState){
      studentInfo.push(
        <li>
          {property}: {this.props.studentState[property].status}
        </li>
      )
    }
    return (
      <div>
        <ul>
          {studentInfo}
        </ul>
        <CommandsA />
      </div>
    );
  }
}

export default connect(
  mapStateToProps
)(DashboardView)
