import React, { Component } from 'react';
import Splash from 'Components/Templates/Splash'

import { Welcome, Checker, DiamondGood, DiamondBad, PostTestA, PreDone, PreIntro, IntroExplainTasks, IntroExplainEditor, MeetKarel, FirstProgram,AnimatedProgram,KarelCommandsTurnLeft, ModifyMoves, CommandsA, CommandsB,KarelCommandsPickStone, KarelCommandsPlaceStone, KarelCommandsMove, RepeatL3Dash5Good, RepeatL3Dash5Bad, RepeatL2StepUpBad, MethodsTurnAroundBad, Repeat5Bad, MethodsReuse, MethodsReuseBad, MethodsStepUpBad, CommandsHouseBad, RepeatL3Corner9, RepeatL2StepUpGood, RepeatL2PlaceRow, Repeat9, Repeat5, CommandsHouseGood, MethodsRightAround, MethodsStepUp, CommandsMLMR, CommandsLMTRM, MethodsTurnAroundGood, PostSurvey, Parson1, Parson2, MultipleWorlds1 } from 'Items'

import {Prolific, Parson, MultipleWorlds} from './TaskSequences'

/**
A single learning experience is called an "item"
An item/example/badExample is called a "problem"
A group of stages is called a "unit"
**/

export default class Curriculum {

  constructor(moduleName) {
    if (moduleName.toLowerCase() == 'prolific') {
      this.pre = Prolific.getPre()
      this.post = Prolific.getPost()
      this.learningPlan = Prolific.getLearningPlan()
    } else if (moduleName.toLowerCase() == 'parson') {
      this.pre = Parson.getPre()
      this.post = Parson.getPost()
      this.learningPlan = Parson.getLearningPlan()
    } else if (moduleName.toLowerCase() == 'multipleworlds') {
      this.pre = MultipleWorlds.getPre()
      this.post = MultipleWorlds.getPost()
      this.learningPlan = MultipleWorlds.getLearningPlan()
    }
  }

  getCollection(collectionType) {
    if (collectionType.toLowerCase()=='pre') {
      return this.pre
    } else if (collectionType.toLowerCase()=='post') {
      return this.post
    } else {
      return this.pre
    }
  }

  getLearning() {
    return this.learningPlan
  }

  isLocked(problemsDone, problem) {
    if('prereq' in problem){
      let prereq = problem['prereq']
      return !(prereq in problemsDone)
    }
    return false
  }

  isPre(currId){
    for(let unitIndex in this.pre) {
      let unit = this.pre[unitIndex]
      if(unit['id'] === currId) {
        return true
      }
    }
    return false
  }

  isPost(currId){
    for(let unitIndex in this.post) {
      let unit = this.post[unitIndex]
      if(unit['id'] === currId) {
        return true
      }
    }
    return false
  }

  getNextItem(currId, itemCollection){
    var index = this.getIndexFromId(currId, itemCollection)
    if(index < itemCollection.length - 1) {
      index++
    }
    return itemCollection[index]['id']
  }

  getIndexFromId(itemId, itemCollection) {
    for(let unitIndex in itemCollection) {
      let unit = itemCollection[unitIndex]
      if(unit['id'] === itemId) {
        // why in gods good name is this a string???
        return parseInt(unitIndex)
      }
    }
  }

  // only applies to dashboard items
  getProblemFromId(itemId) {
    for(let unitIndex in this.learningPlan) {
      let unit = this.learningPlan[unitIndex]
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
  getItemType(itemId) {
    let problem = this.getProblemFromId(itemId)
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
  getComponent(itemId){
    if(itemId in itemComponentDatabase) {
      return(itemComponentDatabase[itemId])
    }
    return itemComponentDatabase['DefaultItem']
  }

  getIndexFromProblem(itemId, itemCollection) {
    for(let unitIndex in itemCollection) {
      let unit = itemCollection[unitIndex]
      if(unit['id'] === itemId) {
        // why in gods good name is this a string???
        return parseInt(unitIndex)
      }
    }
  }

}

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

  // Parson1
  Parson1: <Parson1 />,
  Parson2: <Parson2 />,

  // MultipleWorlds
  MultipleWorlds1: <MultipleWorlds1 />,

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
