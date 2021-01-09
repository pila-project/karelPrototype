import React, { Component } from 'react';
import Splash from 'Components/Templates/Splash'

import { Welcome, Checker, DiamondGood, DiamondBad, PostTestA, PreDone, PreIntro, IntroExplainTasks, IntroExplainEditor, MeetKarel, FirstProgram,AnimatedProgram,KarelCommandsTurnLeft, ModifyMoves, CommandsA, CommandsB,KarelCommandsPickStone, KarelCommandsPlaceStone, KarelCommandsMove, RepeatL3Dash5Good, RepeatL3Dash5Bad, RepeatL2StepUpBad, MethodsTurnAroundBad, Repeat5Bad, MethodsReuse, MethodsReuseBad, MethodsStepUpBad, CommandsHouseBad, RepeatL3Corner9, RepeatL2StepUpGood, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouseGood, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAroundGood, PostSurvey } from 'Items'

/**
A single learning experience is called an "item"
An item/example/badExample is called a "problem"
A group of stages is called a "unit"
**/

export default class SimpleCurriculum {

  static getCollection(collectionType) {
    if (collectionType.toLowerCase()=='pre') {
      return pre
    } else if (collectionType.toLowerCase()=='post') {
      return post
    } else {
      return pre
    }
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

  static isPost(currId){
    for(let unitIndex in post) {
      let unit = post[unitIndex]
      if(unit['id'] === currId) {
        return true
      }
    }
    return false
  }

  static getNextItem(currId, itemCollection){
    var index = SimpleCurriculum.getIndexFromId(currId, itemCollection)
    if(index < itemCollection.length - 1) {
      index++
    }
    return itemCollection[index]['id']
  }

  static getIndexFromId(itemId, itemCollection) {
    for(let unitIndex in itemCollection) {
      let unit = itemCollection[unitIndex]
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

  static getIndexFromProblem(itemId, itemCollection) {
    for(let unitIndex in itemCollection) {
      let unit = itemCollection[unitIndex]
      if(unit['id'] === itemId) {
        // why in gods good name is this a string???
        return parseInt(unitIndex)
      }
    }
  }

}

const pre = [
  {id: 'Welcome'},
  {id:'PreIntro'},
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
  {id:'IntroExplainTasks'},
  {id:'IntroExplainEditor'}

]

const post = [
  {id: 'PostSurvey'}
]

const learningPlan = [
  {
    unitName:'Commands',
    iconId:'egg',
    problems: [
      {
        name:'Basic Commands',
        challenge:'CommandsMLMR',
        goodExample:'CommandsHouseGood',
        badExample:'CommandsHouseBad',
        countDown: 5 // in minutes
      }
    ]
  },
  {
    unitName:'Teach Karel',
    iconId:'hatch',
    problems: [
      {
        name:'Function',
        prereq:'Basic Commands',
        challenge:'MethodsStepUp',
        goodExample:'MethodsTurnAroundGood',
        badExample:'MethodsTurnAroundBad',
        countDown: 7.5
      }
    ],
  },
  {
    unitName:'Repeat',
    iconId:'hatch',
    problems:[
      {
        name:'Repeat',
        prereq: 'Function',
        challenge:'RepeatL2PlaceRow',
        goodExample:'RepeatL2StepUpGood',
        badExample:'RepeatL2StepUpBad',
        countDown: 7.5
      }
    ]
  },
  {
    unitName:'Combine',
    iconId:'hatch',
    problems:[
      {
        name:'Combine',
        prereq: 'Repeat',
        challenge:'RepeatL3Corner9',
        goodExample:'RepeatL3Dash5Good',
        badExample:'RepeatL3Dash5Bad',
        countDown: 10
      },
    ]
  },
  {
    unitName:'Big Challenge Problem #1',
    iconId:'hatch',
    problems:[{
      name:'Challenge',
      prereq: 'Combine',
      challenge:'Checker',
      goodExample:'DiamondGood',
      badExample:'DiamondBad',
      countDown: 15
    }]
  },
]

const itemComponentDatabase = {

  // Pre Test
  Welcome:<Welcome />,
  PreIntro:<PreIntro/>,
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
  PreDone:<PreDone/>,
  IntroExplainTasks: <IntroExplainTasks/>,
  IntroExplainEditor: <IntroExplainEditor/>,

  // Dashboard
  CommandsMLMR: <CommandsMLMR />,
  CommandsHouseGood: <CommandsHouseGood />,
  CommandsHouseBad:<CommandsHouseBad />,
  MethodsTurnAroundGood:<MethodsTurnAroundGood />,
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
  RepeatL2StepUpGood:<RepeatL2StepUpGood />,
  RepeatL2StepUpBad:<RepeatL2StepUpBad />,
  RepeatL3Corner9: <RepeatL3Corner9 />,
  RepeatL3Dash5Good: <RepeatL3Dash5Good />,
  RepeatL3Dash5Bad: <RepeatL3Dash5Bad />,
  DefaultItem: <Splash text={'Default Item'} subText={'The requested item was not found.' }/>,

  // Challenges
  Checker:<Checker/>,
  DiamondGood:<DiamondGood/>,
  DiamondBad:<DiamondBad/>,

  // Post Challenges
  PostSurvey:<PostSurvey/>,

}
