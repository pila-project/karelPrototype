import React, { Component } from 'react';

class DashboardView extends Component {

  static defaultProps = {
    curriculum: [
      {
        unitName:'Commands',
        problems: [
          {
            id:'cmd1',
            component:<Commands1 />
          },
          {
            id:'cmd2',
            component:<Commands2 />
          }
        ],
        workedExamples : [
          {
            id:'exCmd1',
            component:<CommandsEx1 />
          },
          {
            id:'exCmd2',
            component:<CommandsEx2 />
          }
        ]
      }
    ],
    studentState: {
      cmd1: {
        isDone:true,
        code:`<xml xmlns="http://www.w3.org/1999/xhtml">
                    <block type="karel_main" deletable="false" movable="false" x="${OFFSET}" y="${OFFSET}"></block>
                  </xml>`
      }
    }
  }

  render() {

    return (
      <div>Hello world</div>
    )
  }
}

export default DashboardView