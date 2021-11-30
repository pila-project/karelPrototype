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
  {id:'IntroExplainEditor'},
  {id:'IntroExplainEditor_Resources'}

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
    unitName:'Teach Karel',
    iconId:'hatch',
    problems: [
      {
        name:'Function 1',
        prereq:'Basic Commands',
        challenge:'BuryTreasures',
        goodExample:'MethodsTurnAroundGood',
        badExample:'MethodsTurnAroundBad',
        countDown: 5
      },
      ,
      {
        name:'Function 2',
        prereq:'Function 1',
        challenge:'PlaceStonesWithFunctions',
        goodExample: 'PlaceStonesWithFunctionsGood',
        badExample: 'PlaceStonesWithFunctionsBad',
        countDown: 7.5
      }
    ],
  },
  {
    unitName:'Repeat',
    iconId:'hatch',
    problems:[
      {
        name:'Repeat 1',
        prereq: 'Function 2',
        challenge:'RepeatL2PlaceRow_scaffolded',
        goodExample:'RepeatL2StepUpGood',
        badExample:'RepeatL2StepUpBad',
        countDown: 5
      },
      {
        name:'Repeat 2',
        prereq: 'Repeat 1',
        challenge:'RepeatL3AlternateRows',
        goodExample:'RepeatL3AlternateRowsGood',
        badExample:'RepeatL3AlternateRowsBad',
        countDown: 7.5
      },
    ]
  },
  {
    unitName:'Combine',
    iconId:'hatch',
    problems:[
      {
        name:'Combine',
        prereq: 'Repeat 2',
        challenge:'RepeatL3Corner9_scaffolded',
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
      countDown: 30
    }]
  },
]
