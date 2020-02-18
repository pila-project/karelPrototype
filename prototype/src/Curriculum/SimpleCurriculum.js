import React, { Component } from 'react';
import Splash from 'Components/Templates/Splash'

import {MeetKarel, FirstProgram,AnimatedProgram,KarelCommandsTurnLeft, ModifyMoves, CommandsA, CommandsB,KarelCommandsPickStone, KarelCommandsPlaceStone, KarelCommandsMove, RepeatL3Dash5, RepeatL3Dash5Bad, RepeatL2StepUpBad, MethodsTurnAroundBad, Repeat5Bad, MethodsReuse, MethodsReuseBad, MethodsStepUpBad, CommandsHouseBad, RepeatL3Corner9, RepeatL2StepUp, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouse, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAround} from 'Items'

/**
A single learning experience is called an "item"
An item/example/badExample is called a "problem"
A group of stages is called a "unit"
**/

export default class SimpleCurriculum {

  static getPre() {
    return pre
  }

  static getPost() {
    return []
  }

  static getLearning() {
    return learningPlan
  }

  static isLocked(problemsDone, problem) {
    if('prereq' in problem){
      let prereq = problem['prereq']
      return !(prereq in problemsDone)
    }
    return false
  }

  static isPre(currId){
    for(let unitIndex in pre) {
      let unit = pre[unitIndex]
      if(unit['id'] === currId) {
        return true
      }
    }
    return false
  }

  static getNextPreItem(currId){
    var index = SimpleCurriculum.getIndexFromPreId(currId)
    if(index < pre.length - 1) {
      index++
    }
    return pre[index]['id']
  }

  static getIndexFromPreId(itemId) {
    for(let unitIndex in pre) {
      let unit = pre[unitIndex]
      if(unit['id'] === itemId) {
        // why in gods good name is this a string???
        return parseInt(unitIndex)
      }
    }
  }

  // only applies to dashboard items
  static getProblemFromId(itemId) {
    for(let unitIndex in learningPlan) {
      let unit = learningPlan[unitIndex]
      for(let problemIndex in unit['problems']) {
        let problem = unit['problems'][problemIndex]
        let allProblems = Object.values(problem)
        let hasUnitId = allProblems.indexOf(itemId) > -1
        if(hasUnitId) {
          return problem
        }
      }
    }
  }

  // only applies to dashboard items
  static getItemType(itemId) {
    let problem = SimpleCurriculum.getProblemFromId(itemId)
    for(var key in problem){
      if(problem[key] == itemId) {
        return key
      }
    }
  }


  /**
   * Returns the component for the problem / worked example
   * with the given id. 
   */
  static getComponent(itemId){
    if(itemId in itemComponentDatabase) {
      return(itemComponentDatabase[itemId]) 
    }
    return itemComponentDatabase['DefaultItem']
  }

}

const pre = [
  {id:'Welcome'},
  {id:'MeetKarel'},
  {id:'KarelCommandsMove'},
  {id:'KarelCommandsTurnLeft'},
  {id:'KarelCommandsPickStone'},
  {id:'KarelCommandsPlaceStone'},
  {id:'CommandsA'},
  {id:'CommandsB'},
  {id:'FirstProgram'},
  //{id:'AnimatedProgram'},
  {id:'ModifyMoves'},
  {id:'PreDone'},
]

const learningPlan = [
  {
    unitName:'Commands',
    iconId:'egg',
    problems: [
      {
        name:'Commands 1',
        challenge:'CommandsMLMR',
        goodExample:'CommandsHouse',
        badExample:'CommandsHouseBad'
      }
    ]
  },
  {
    unitName:'Teach Karel',
    iconId:'hatch',
    problems: [
      {
        name:'Methods 1',
        prereq:'Commands 1',
        challenge:'MethodsStepUp',
        goodExample:'MethodsTurnAround',
        badExample:'MethodsTurnAroundBad'
      },
      {
        name: 'Methods 2',
        prereq:'Methods 1',
        challenge:'MethodsRightAround',
        goodExample:'MethodsReuse',
        badExample:'MethodsReuseBad'
      }
    ],
  },
  {
    unitName:'Repeat',
    iconId:'hatch',
    problems:[
      {
        name:'Repeat 1',
        prereq: 'Methods 1',
        challenge:'Repeat9',
        goodExample:'Repeat5',
        badExample:'Repeat5Bad'
      },
      {
        name:'Repeat 2',
        prereq: 'Repeat 1',
        challenge:'RepeatL2PlaceRow',
        goodExample:'RepeatL2StepUp',
        badExample:'RepeatL2StepUpBad'
      },
      {
        name:'Repeat 3',
        prereq: 'Repeat 2',
        challenge:'RepeatL3Corner9',
        goodExample:'RepeatL3Dash5',
        badExample:'RepeatL3Dash5Bad'
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
]

const itemComponentDatabase = {

  // Pre Test
  Welcome:<Splash text={'Welcome'} subText={'Lets learn to program.' }/>,
  MeetKarel:<MeetKarel />,
  KarelCommandsMove:<KarelCommandsMove />,
  KarelCommandsTurnLeft:<KarelCommandsTurnLeft />,
  KarelCommandsPickStone:<KarelCommandsPickStone />,
  KarelCommandsPlaceStone:<KarelCommandsPlaceStone/>,
  CommandsA:<CommandsA/>,
  CommandsB:<CommandsB/>,
  ModifyMoves:<ModifyMoves />,
  FirstProgram:<FirstProgram />,
  AnimatedProgram:<AnimatedProgram />,
  PreDone:<Splash text={'Great work!'} subText={'You have finished the warmup...' }/>,

  // Dashboard
  CommandsMLMR: <CommandsMLMR />,
  CommandsHouse: <CommandsHouse />,
  CommandsHouseBad:<CommandsHouseBad />,
  MethodsTurnAround:<MethodsTurnAround />,
  MethodsTurnAroundBad: <MethodsTurnAroundBad />,
  MethodsStepUp:<MethodsStepUp />,
  MethodsStepUpBad:<MethodsStepUpBad />,
  MethodsRightAround: <MethodsRightAround />,
  MethodsReuse: <MethodsReuse />,
  MethodsReuseBad:<MethodsReuseBad />,
  Repeat9:<Repeat9 />,
  Repeat5: <Repeat5 />,
  Repeat5Bad: <Repeat5Bad />,
  RepeatL2PlaceRow: <RepeatL2PlaceRow />,
  RepeatL2StepUp:<RepeatL2StepUp />,
  RepeatL2StepUpBad:<RepeatL2StepUpBad />,
  RepeatL3Corner9: <RepeatL3Corner9 />,
  RepeatL3Dash5: <RepeatL3Dash5 />,
  RepeatL3Dash5Bad: <RepeatL3Dash5Bad />,
  DefaultItem: <Splash text={'Default Item'} subText={'The requested item was not found.' }/>,
  //// 'RepeatL2PlaceRow',
  // 'RepeatL3Corner9'
}