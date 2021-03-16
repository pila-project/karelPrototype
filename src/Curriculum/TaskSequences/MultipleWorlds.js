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
]

export const post = [
  {id: 'PostSurvey'}
]

export const learningPlan = [
  {
    unitName:'MultipleWorlds1',
    iconId:'hatch',
    problems: [
      {
        name:'Multiple Worlds 1',
        challenge:'MultipleWorlds1',
        countDown: 30 // in minutes
      }
    ]
  },
  {
    unitName:'MultipleWorldsIF1',
    iconId:'hatch',
    problems: [
      {
        name:'Multiple Worlds 2',
        challenge:'MultipleWorldsIF1',
        countDown: 30 // in minutes
      }
    ]
  },
  {
    unitName:'MultipleWorldsIF2',
    iconId:'hatch',
    problems: [
      {
        name:'Multiple Worlds 3',
        challenge:'MultipleWorldsIF2',
        countDown: 30 // in minutes
      }
    ]
  }
]
