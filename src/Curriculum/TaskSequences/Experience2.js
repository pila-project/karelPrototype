/**
A single learning experience is called an "item"
An item/example/badExample is called a "problem"
A group of stages is called a "unit"
**/

export default class TaskSequences {

  static getPre() {
    return pre
  }

  static getPost() {
    return post
  }

  static getLearningPlan() {
    return learningPlan
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

export const post = [
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
    unitName:'Conditionals',
    iconId:'hatch',
    problems: [
      {
        name:'Conditionals 1',
        prereq:'Basic Commands',
        challenge:'MultipleWorldsIF1',
        goodExample:'MWIF1GOOD',
        badExample:'MWIF1BAD',
        countDown: 30
      },
      ,
      {
        name:'Conditionals 2',
        prereq:'Conditionals 1',
        challenge:'MultipleWorldsIF2',
        goodExample:'MWIF2GOOD',
        badExample:'MWIF2BAD',
        countDown: 30
      }
    ],
  },
  {
    unitName:'While',
    iconId:'hatch',
    problems:[
      {
        name:'While 1',
        prereq:'Conditionals 2',
        challenge:'MultipleWorldsWHILE1',
        goodExample:'MWWHILE1GOOD',
        badExample:'MWWHILE1BAD',
        countDown: 30
      },
      ,
      {
        name:'While 2',
        prereq:'While 1',
        challenge:'MultipleWorldsWHILE2',
        goodExample:'MWWHILE2GOOD',
        badExample:'MWWHILE2BAD',
        countDown: 30
      }
    ]
  },
  {
    unitName:'Combine',
    iconId:'hatch',
    problems:[
      {
        name:'Combine 1',
        prereq: 'While 2',
        challenge:'MultipleWorldsCOMBINE1',
        goodExample:'MWCOMBINE1GOOD',
        badExample:'MWCOMBINE1BAD',
        countDown: 10
      },
      {
        name:'Combine 2',
        prereq: 'Combine 1',
        challenge:'MultipleWorldsCOMBINE2',
        goodExample:'MWCOMBINE2GOOD',
        badExample:'MWCOMBINE2BAD',
        countDown: 10
      },
    ]
  },
  {
    unitName:'Big Challenge Problem #1',
    iconId:'hatch',
    problems:[{
      name:'Challenge',
      prereq: 'Combine 2',
      challenge:'MultipleWorldsCHALLENGE2',
      goodExample:'MWCHALLENGE2GOOD',
      badExample:'MWCHALLENGE2BAD',
      countDown: 30
    }]
  },
]
