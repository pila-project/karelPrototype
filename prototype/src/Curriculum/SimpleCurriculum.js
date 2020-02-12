import React, { Component } from 'react';

import {CommandsMLMR} from 'Items'


export default class SimpleCurriculum {

  static getPre() {
    return []
  }

  static getPost() {
    return []
  }

  static getLearning() {
    return [
      {
        unitName:'Commands',
        iconId:'egg',
        problems: [
          {
            id:'cmd1',
            component:<CommandsMLMR />
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
  }

  /**
   * Returns the component for the problem / worked example
   * with the given id. In the future we can certainly make
   * this faster by caching a lookup map, but it doesn't
   * seem like a performance heavy task!
   */
  static getComponent(goalId) {
    let model = SimpleCurriculum.getLearning()
    for(let unitIndex in model) {
      let unit = model[unitIndex]
      // search in all the problems
      for(let probIndex in unit['problems']) {
        let prob = unit['problems'][probIndex]
        if(prob['id'] == goalId) {
          return prob['component']
        }
      }
      // search in all the worked examples
      for(let workedIndex in unit['workedExamples']) {
        let worked = unit['workedExamples'][workedIndex]
        if(worked['id'] == goalId) {
          return worked['component']
        }
      }
    }
    return <span>Item not found!</span>
  }
}