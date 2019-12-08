import React, { Component } from 'react'

import Intro from '../Lessons/Intro.js'
import Motivation from '../Lessons/Motivation.js'
import KarelCommands from '../Lessons/KarelCommands.js'
import KarelCommandsMove from '../Lessons/KarelCommandsMove.js'
import KarelCommandsPickStone from '../Lessons/KarelCommandsPickStone.js'
import KarelCommandsPlaceStone from '../Lessons/KarelCommandsPlaceStone.js'
import KarelCommandsTurnLeft from '../Lessons/KarelCommandsTurnLeft.js'
import PreTest from '../Lessons/PreTest.js'
import Learning from '../Lessons/Learning.js'
import PostTest from '../Lessons/PostTest.js'
import DemoBlocks from '../Lessons/DemoBlocks.js'
import DemoIde from '../Lessons/DemoIde.js'
import DemoPrePostIde from '../Lessons/DemoPrePostIde.js'
import DemoMultipleTests from '../Lessons/DemoMultipleTests.js'

var lessonList = [
  {
    name:'Motivation',
    render:<Motivation />
  },
  {
    name:'KarelCommandsMove',
    render:<KarelCommandsMove />
  },
  {
    name:'KarelCommandsTurnLeft',
    render:<KarelCommandsTurnLeft />
  },
  {
    name:'KarelCommandsPlaceStone',
    render:<KarelCommandsPlaceStone />
  },
  {
    name:'KarelCommandsPickStone',
    render:<KarelCommandsPickStone />
  },
  {
    name:'Pre Test',
    render:<PreTest />
  },
  {
    name:'Learning',
    render:<Learning />
  },
  {
    name:'Post Test',
    render:<PostTest />
  },
  {
    name:'Ide Demo',
    render:<DemoIde />
  },
  {
    name:'PrePost Demo',
    render:<DemoPrePostIde />
  },
  {
    name:'MultipleTests Demo',
    render:<DemoMultipleTests />
  },
]

export default lessonList