import React, { Component } from 'react';

import {RepeatL3Dash5, MethodsReuse, MethodsReuseBad, MethodsStepUpBad, CommandsHouseBad, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'

export default class SimpleCurriculum {

  static getPre() {
    return []
  }

  static getPost() {
    return []
  }

  static getLearning() {
    return learningPlan
  }

  static getItemFromId(itemId) {
    return itemDatabase[itemId]
  }

  static isLocked(studentState, itemId) {
    // let item = SimpleCurriculum.getItemFromId(itemId)
    // if('prereq' in item){
    //   let prereq = item['prereq']
    //   return !(prereq in studentState)
    // }
    //for now everything is unlocked (testing)
    return false
  }

  /**
   * Returns the component for the problem / worked example
   * with the given id. In the future we can certainly make
   * this faster by caching a lookup map, but it doesn't
   * seem like a performance heavy task!
   */
  static getComponent(itemId) {
    let item = SimpleCurriculum.getItemFromId(itemId)
    return item['component']
  }
}

const learningPlan = [
  {
    unitName:'Commands',
    iconId:'egg',
    problems: [
      'CommandsMLMR'
    ]
  },
  {
    unitName:'Teach Karel',
    iconId:'hatch',
    problems: [
      'MethodsTurnAround',
      'MethodsRightAround'
    ],
  },
  {
    unitName:'Repeat',
    iconId:'hatch',
    problems:[
      'Repeat9',
      'RepeatL2PlaceRow',
      'RepeatL3Corner9'
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
  // {
  //   unitName:'While Loops',
  //   iconId:'egg',
  //   problems: [
  //     {
  //       itemId:'while1',
  //       name:'While 1',
  //       prereq:'challenge1',
  //       examples: {
  //         'Example':'cmdHouse'
  //       }
  //     },
  //     {
  //       itemId:'while2',
  //       name:'While 2',
  //       prereq:'while1',
  //       examples: {
  //         'Example':'cmdHouse'
  //       }
  //     }
  //   ],
  // },
  // {
  //   unitName:'If',
  //   iconId:'hatch',
  //   problems: [
  //     {
  //       itemId:'if1',
  //       name:'If 1',
  //       prereq:'while1',
  //       examples: {
  //         'Example':'cmdHouse'
  //       }
  //     },
  //     {
  //       itemId:'if2',
  //       name:'If 2',
  //       prereq:'if1',
  //       examples: {
  //         'Example':'cmdHouse'
  //       }
  //     }
  //   ],
  // },
  // {
  //   unitName:'Big Challenge Problem #2',
  //   isChallenge:true,
  //   itemId:'challenge2',
  //   prereq:'challenge1',
  //   examples: {
  //     'Example':'cmdHouse'
  //   }
  // },
]

const itemDatabase = {
  // Commands 1
  CommandsMLMR: {
    name:'Commands 1',
    component:<CommandsMLMR />,
    // Commands 1 Tripplet
    challenge:'CommandsMLMR',
    goodExample:'CommandsHouse',
    badExample:'CommandsHouseBad'
  },
  CommandsHouse: {
    name:'Commands House',
    component:<CommandsHouse />,
    isGoodExample:true,
    // Commands 1 Tripplet
    challenge:'CommandsMLMR',
    goodExample:'CommandsHouse',
    badExample:'CommandsHouseBad'
  },
  CommandsHouseBad: {
    name:'Commands House Bad',
    component:<CommandsHouseBad />,
    isBadExample:true,
    // Commands 1 Tripplet
    challenge:'CommandsMLMR',
    goodExample:'CommandsHouse',
    badExample:'CommandsHouseBad'
  },

  // Teach 1
  MethodsTurnAround: {
    name:'Teach 1',
    component:<MethodsTurnAround />,
    // Teach 1 Tripplet
    challenge:'MethodsTurnAround',
    goodExample:'MethodsStepUp',
    badExample:'MethodsStepUpBad'
  },
  MethodsStepUp: {
    name:'Teach StepUp',
    isGoodExample:true,
    component:<MethodsStepUp />,
    // Teach 1 Tripplet
    challenge:'MethodsTurnAround',
    goodExample:'MethodsStepUp',
    badExample:'MethodsStepUpBad'
  },
  MethodsStepUpBad: {
    name:'Teach StepUp',
    isBadExample:true,
    component:<MethodsStepUpBad />,
    // Teach 1 Tripplet
    challenge:'MethodsTurnAround',
    goodExample:'MethodsStepUp',
    badExample:'MethodsStepUpBad'
  },

  // Teach 2
  MethodsRightAround: {
    name:'Teach 2',
    prereq:'cmd1',
    component:<MethodsRightAround />,
    // Teach 1 Tripplet
    challenge:'MethodsRightAround',
    goodExample:'MethodsReuse',
    badExample:'MethodsReuseBad'
  },
  MethodsReuse: {
    name:'Teach 2',
    prereq:'cmd1',
    isGoodExample:true,
    component:<MethodsReuse />,
    // Teach 1 Tripplet
    challenge:'MethodsRightAround',
    goodExample:'MethodsReuse',
    badExample:'MethodsReuseBad'
  },
  MethodsReuseBad: {
    name:'Teach 2',
    prereq:'cmd1',
    isBadExample:true,
    component:<MethodsReuseBad />,
    // Teach 1 Tripplet
    challenge:'MethodsRightAround',
    goodExample:'MethodsReuse',
    badExample:'MethodsReuseBad'
  },
  // Repeat 1
  Repeat9: {
    name:'Repeat 1',
    prereq:'cmd1',
    component:<Repeat9 />,
    // Repeat 1 Tripplet
    challenge:'Repeat9',
    goodExample:'Repeat9',
    badExample:'Repeat9'
  },
  // Repeat 2
  RepeatL2PlaceRow: {
    name:'Repeat 2',
    prereq:'cmd1',
    component:<RepeatL2PlaceRow />,
    // Repeat 2 Tripplet
    challenge:'RepeatL2PlaceRow',
    goodExample:'RepeatL2PlaceRow',
    badExample:'RepeatL2PlaceRow'
  },
  // Repeat 3
  RepeatL3Corner9: {
    name:'Repeat 3',
    prereq:'cmd1',
    component:<RepeatL3Corner9 />,
    // Repeat 3 Tripplet
    challenge:'RepeatL3Corner9',
    goodExample:'RepeatL3Corner9',
    badExample:'RepeatL3Corner9'
  },

  //// 'RepeatL2PlaceRow',
  // 'RepeatL3Corner9'
}

