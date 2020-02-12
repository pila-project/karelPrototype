import React, { Component } from 'react'
import { CommandsA, CommandsB, PreTestA, PreTestGuessSimple, PreTestGuessWhile, PostTestA } from './Tests'
import { KarelCommandsMove, KarelCommandsTurnLeft, KarelCommandsPickStone, KarelCommandsPlaceStone } from './Demos'
import { AnimatedProgram, ProgramsA, ModifyMoves, Learn, ModifyB, ModifyC, FnTurnRight, FnTurnAround, Repeat5, RepeatCorners, Repeat9, RepeatMethodsA, RepeatMethodsTest } from './Learning'
import Splash from './Components/Templates/Splash'

export const STATUS = {
    UNVISITED:'unvisited',
    INPROGRESS:'inprogress',
    COMPLETED:'completed'
}

export const idToComponent = {
    'splashNavigation': <Splash text={'Prototype'} subText={'(use <- and ->)'}/>,
    'splashMotivation': <Splash text={'Motivation!'} subText={'In this experience you are going to be learning! Everyone will succeed. Coding is important'}/>,
    'splashPreTestInfo': <Splash text={'PreTest: Context + Knowledge'} subText={'We teach students how to use the UI and test both their comfort in the environment and their prior control flow.'}/>,
    'splashPreTestGuess': <Splash text={'Pre Test'} subText={"Make your best guess"}/>,
    'splashLearn': <Splash text={'Learning'} subText={"Let's learn how to program!"}/>,
    'splashPostTest': <Splash text={'Post Test'} subText={"Lets celebrate"}/>,
    'tutorialKarelCommandsMove': <KarelCommandsMove />,
    'tutorialKarelCommandsTurnLeft' : <KarelCommandsTurnLeft />,
    'tutorialKarelCommandsPickStone': <KarelCommandsPickStone />,
    'tutorialKarelCommandsPlaceStone': <KarelCommandsPlaceStone />,
    'tutorialCommandsA': <CommandsA />,
    'tutorialCommandsB': <CommandsB />,
    'preTestGuessSimple': <PreTestGuessSimple />,
    'preTestGuessWhile': <PreTestGuessWhile />,
    'tutorialAnimatedProgram': <AnimatedProgram />,
    'tutorialProgramsA': <ProgramsA />,
    'tutorialModifyMoves': <ModifyMoves/>,
    'preTestA': <PreTestA />,
    'learnDashboard': <Learn />,
    'learnModifyB': <ModifyB />,
    'learnModifyC': <ModifyC />,
    'learnTurnRight': <FnTurnRight />,
    'learnTurnAround': <FnTurnAround />,
    'learnRepeat5': <Repeat5 />,
    'learnRepeatCorners': <RepeatCorners />,
    'learnRepeat9': <Repeat9 />,
    'learnRepeatMethodsA': <RepeatMethodsA />,
    'learnRepeatMethodsTest': <RepeatMethodsTest />,
    'postTestA': <PostTestA />
}

export const IDs = Object.keys(idToComponent);

export function getComponentFromId(id){
    if (IDs.includes(id)){
        return(idToComponent[id]);
    } else {
        return (<Splash text={'Missing'} subText={'Component with ID "' + id + '" not found.' }/>);
    }
}