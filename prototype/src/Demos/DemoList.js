import React, { Component } from 'react'

import Motivation from './Motivation.js'
import KarelCommandsMove from './KarelCommandsMove.js'
import KarelCommandsPickStone from './KarelCommandsPickStone.js'
import KarelCommandsPlaceStone from './KarelCommandsPlaceStone.js'
import KarelCommandsTurnLeft from './KarelCommandsTurnLeft.js'
import PreTest from './PreTest.js'
import Learning from './Learning.js'
import PostTest from './PostTest.js'
import DemoPrePostIde from './DemoPrePostIde.js'
import DemoMultipleTests from './DemoMultipleTests.js'
import DemoMultipleTests2 from './DemoMultipleTests2.js'
import DemoMultipleTests3 from './DemoMultipleTests3.js'
import DemoMultipleTests3_CustomStarterCode from './DemoMultipleTests3_CustomStarterCode.js'


var lessonList = [
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
    name:'PrePost Demo',
    render:<DemoPrePostIde />
  },
  {
    name:'MultipleTests Demo',
    render:<DemoMultipleTests />
  },
  {
    name:'MultipleTests Demo 2',
    render:<DemoMultipleTests2 />
  },
  {
    name:'MultipleTests Demo 3',
    render:<DemoMultipleTests3 />
  },
  {
    name:'MultipleTests Demo 3 Custom Starter Code',
    render:<DemoMultipleTests3_CustomStarterCode />
  },
]

export default lessonList