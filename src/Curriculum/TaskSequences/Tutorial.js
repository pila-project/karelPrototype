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

  static getEnableKeys() {
    return false
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
  {id:'TutorialEnd'}
]

export const post = [
]

const learningPlan = [
]
