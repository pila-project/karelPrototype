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

export const learningPlan = [
  {
    unitName:'Parson1',
    iconId:'hatch',
    problems: [
      {
        name:'Parson Problem 1',
        challenge:'Parson1',
        countDown: 50 // in minutes
      }
    ]
  },
  {
    unitName:'Parson2',
    iconId:'hatch',
    problems: [
      {
        name:'Parson Problem 2',
        challenge:'Parson2',
        countDown: 50 // in minutes
      }
    ]
  }
]
