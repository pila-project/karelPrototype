import React, { Component } from 'react';
import { connect } from 'react-redux'
import PreTest from '../../Demos/PreTest.js'

const mapStateToProps = (state, ownProps) => {
  const studentState = state.studentState;
  return { studentState };
}

class DashboardView extends Component {

  constructor(props){
    super(props);
  }

  static defaultProps = {
    curriculum: [
      {
        unitName:'Commands',
        problems: [
          {
            id:'cmd1',
            component:<PreTest />
          },
          {
            id:'cmd2',
            component:<PreTest />
          }
        ],
        workedExamples : [
          {
            id:'exCmd1',
            component:<PreTest />
          },
          {
            id:'exCmd2',
            component:<PreTest />
          }
        ]
      }
    ]
  }

  render() {
    return (
      <div>Hello world</div>
    )
  }
}

export default connect(
  mapStateToProps
)(DashboardView)
