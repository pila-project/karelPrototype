import React, { Component } from 'react';

import {RepeatL3Dash5, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'


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
            itemId:'cmd1',
            name:'Commands',
            examples: {
              'Example':'cmdHouse'
            }
          },
        ]
      },
      {
        unitName:'Teach Karel',
        iconId:'hatch',
        problems: [
          {
            itemId:'teach1',
            name:'Teach 1',
            prereq:'cmd1',
            examples: {
              'Example':'cmdHouse'
            }
          },
          {
            itemId:'teach2',
            name:'Teach 2',
            prereq:'teach1',
            examples: {
              'Example':'cmdHouse'
            }
          }
        ],
      },
      {
        unitName:'Repeat',
        iconId:'hatch',
        problems:[
          {
            itemId:'repeat1',
            name:'Repeat 1',
            prereq:'teach1',
            examples: {
              'Example':'cmdHouse'
            }
          },
          {
            itemId:'repeat2',
            name:'Repeat 2',
            prereq:'repeat1',
            examples: {
              'Example':'cmdHouse'
            }
          },
          {
            itemId:'repeat3',
            name:'Repeat 3',
            prereq:'repeat2',
            examples: {
              'Example':'cmdHouse'
            }
          },
        ]
      },
      {
        unitName:'Big Challenge Problem #1',
        isChallenge:true,
        itemId:'challenge1',
        examples: {
          'Example':'cmdHouse'
        }
      },
      {
        unitName:'While Loops',
        iconId:'egg',
        problems: [
          {
            itemId:'while1',
            name:'While 1',
            prereq:'challenge1',
            examples: {
              'Example':'cmdHouse'
            }
          },
          {
            itemId:'while2',
            name:'While 2',
            prereq:'while1',
            examples: {
              'Example':'cmdHouse'
            }
          }
        ],
      },
      {
        unitName:'If',
        iconId:'hatch',
        problems: [
          {
            itemId:'if1',
            name:'If 1',
            prereq:'while1',
            examples: {
              'Example':'cmdHouse'
            }
          },
          {
            itemId:'if2',
            name:'If 2',
            prereq:'if1',
            examples: {
              'Example':'cmdHouse'
            }
          }
        ],
      },
      {
        unitName:'Big Challenge Problem #2',
        isChallenge:true,
        itemId:'challenge2',
        prereq:'challenge1',
        examples: {
          'Example':'cmdHouse'
        }
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
    return <MethodsRightAround />
  }
}