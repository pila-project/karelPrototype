import React from 'react'

import Curriculum from 'Curriculum/Curriculum.js'
import { UPDATE_STATUS, UPDATE_MODULE, PRE_ITEM_COMPLETE, PROBLEM_COMPLETE, POST_ITEM_COMPLETE, UPDATE_CURRENT_VIEW, UPDATE_ITEM, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE, USER_LOGGED, END_SESSION, UPDATE_USERID, TIMEDOUT, UPDATE_COUNTDOWN, UPDATE_WORLD, UPDATE_HINTS, LOAD_SOLUTION } from "../actionTypes";
import { STATUS, VIEW, IDs } from "../../constants"
import { REHYDRATE } from 'redux-persist'

const initialState = {
  locale: 'en',
  module: '',
  currentView: 'Welcome',
  userId: '',
  autofillUserId: true,
}

const initialPageState = {
  currentView: '',
  item: '',
  studentState: {},
  countdown: {},
  hintsGiven: {},
  points: 0,
  world: '',
}



// Reducers can't update the redux store directly because it is immutable.
// So, reducers have to copy the store, modify it, and return the copy.
// All of the spread operators below are being used to create a copy of the state
// and selectively modify the part that needs to be changed based
// on the action that was received. For example, when UPDATE_STATUS is
// received, the `status` value of the item specified by state.currentView is updated.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW: return updateCurrentView(state, action)
    case UPDATE_ITEM: return updateItem(state, action)
    case UPDATE_STATUS: return updateStatus(state, action)
    case UPDATE_MODULE: return updateModule(state, action)
    case UPDATE_WORLD: return updateWorld(state, action)
    case PRE_ITEM_COMPLETE: return preItemComplete(state, action)
    case PROBLEM_COMPLETE: return problemComplete(state, action)
    case POST_ITEM_COMPLETE: return postItemComplete(state, action)
    case UPDATE_CODE: return updateCode(state, action)
    case UPDATE_LOCALE: return updateLocale(state, action)
    case RUN_CODE: return runCode(state, action)
    case USER_LOGGED: return userLogged(state, action)
    case TIMEDOUT: return timedOut(state, action)
    case UPDATE_USERID: return updateUserId(state, action)
    case END_SESSION: return endSession(state, action)
    case UPDATE_COUNTDOWN: return updateCountdown(state, action)
    case UPDATE_HINTS: return updateHints(state, action)
    case LOAD_SOLUTION: return loadSolution(state, action)
    default: return state
  }
};

function endSession(state, action) {
  var LearnModule = new Curriculum(state.module)
  let pre = LearnModule.getCollection('pre')
  let initialPage = pre[0].id; // Return user to initial page, but without autofilling user id
  return {
    ...initialState,
    autofillUserId: false
  }
}

function updateLocale(state, action) {
  return {
    ...state,
    locale: action.locale
  }
}

function userLogged(state, action) {
  return {
    ...state,
    userId: action.payload
  }
}

function updateUserId(state, action) {
  return {
    ...state,
    userId: action.userId,
    autofillUserId: true
  }
}

function updateWorld(state, action) {
  var stateModule = state[state.module]

  return {
    ...state,
    [state.module]: {
      ...state[state.module],
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          world: action.worldName,
          solvedWorlds: action.solvedWorlds
        }
      }
    }
  }
}

function updateModule(state, action) {

  if (state.module != action.moduleName) { // This is needed to ensure that refresh does not re-initialize the state.
    if (!(action.moduleName in state)) {
      var LearnModule = new Curriculum(action.moduleName)
      let pre = LearnModule.getCollection('pre')
      let initialPage = pre[0].id; // Return user to initial page, but without autofilling user id
      return {
        ...state,
        currentView: pre[0].id,
        [action.moduleName]: {
          ... initialPageState,
          currentView: pre[0].id
        },
        module: action.moduleName,
      }
    } else {
      return {
        ...state,
        currentView: state[action.moduleName].currentView,
        module: action.moduleName
      }
    }
  } else {
    return {
      ...state
    }
  }

}

function preItemComplete(state, action){
  var LearnModule = new Curriculum(state.module)
  let pre = LearnModule.getCollection('pre')
  var stateModule = state[state.module];
  let currId = stateModule.currentView
  var index = LearnModule.getIndexFromId(currId,pre)
  if(index < pre.length - 1) {
    // go to the next problem
    let nextId = pre[index + 1]['id']
    return {
      ...state,
      currentView: nextId,
      [state.module]: {
        ...stateModule,
        currentView: nextId,
        item: nextId
      }
    }
  } else {
    // switch to the "learning" part of the test
    return {
      ...state,
      currentView: 'dashboard',
      [state.module]: {
        ...stateModule,
        currentView: 'dashboard',
        item: 'dashboard'
      }
    }
  }
}

function postItemComplete(state, action){
  var LearnModule = new Curriculum(state.module)
  let post = LearnModule.getCollection('post')
  var stateModule = state[state.module]
  var index = 0
  if ('index' in action) {
    index = action.index;
  } else {
    let currId = stateModule.currentView
    index = LearnModule.getIndexFromId(currId,post)
  }
  if(index < post.length - 1) {
    // go to the next problem
    let nextId = post[index + 1]['id']
    return {
      ...state,
      currentView: nextId,
      [state.module]: {
        ...stateModule,
        currentView: nextId,
        item: nextId
      }
    }
  } else {
    // switch to the "learning" part of the test
    return {
      ...state,
      currentView: 'goodbye',
      [state.module]: {
        ...stateModule,
        currentView: 'goodbye',
        item: 'goodbye'
      }
    }
  }
}

function updateCurrentView(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    currentView: action.view,
    [state.module]: {
      ...stateModule,
      currentView: action.view
    }
  }
}

function updateItem(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    [state.module]: {
      ...stateModule,
      item: action.item
    }
  }
}

function updateStatus(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    [state.module]: {
      ...stateModule,
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          status: action.status
        }
      }
    }
  }
}

function problemComplete(state, action) {
  var stateModule = state[state.module]
  var new_points = stateModule.points;
  var count_points = true
  var go_to_dashboard = true
  var reason_completed = STATUS.COMPLETED

  if (typeof action.item === 'object') {

    if (action.item['showSolution']) {
      count_points = false
      go_to_dashboard = false
      reason_completed = STATUS.COMPLETED
    } else if (action.item['onButtonClick']) {
      go_to_dashboard = true
    }
  } else if (typeof state[state.module].studentState[stateModule.currentView] === 'object') {
    if (state[state.module].studentState[stateModule.currentView]['status'] =='completed') {
      count_points = false
      go_to_dashboard = false
    }
  }

  if (count_points) {
    new_points += 100;
  }

  console.log(go_to_dashboard)

  return {
    ...state,
    [state.module]: {
      ...stateModule,
      currentView: go_to_dashboard ? 'dashboard' : stateModule.currentView,
      points: new_points,
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          status: reason_completed,
        }
      }
    }
  }
}

function updateCode(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    [state.module]: {
      ...stateModule,
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          code: action.codeUpdate.code
        }
      }
    }
  }
}

function runCode(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    [state.module]: {
      ...stateModule,
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          run_type: action.runData.runType
        }
      }
    }
  }
}

function timedOut(state, action) {
  var stateModule = state[state.module]
  return {
    ...state,
    [state.module]: {
      ...stateModule,
      currentView: 'dashboard',
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          status: STATUS.TIMEDOUT
        }
      }
    }
  }
}

function loadSolution(state, action) {
  var stateModule = state[state.module]

  var tmp_hints = stateModule.hintsGiven;

  var solToLoad = action.solToLoad
  var code = solToLoad.code;
  delete solToLoad['code'];

  if (Object.keys(action.solToLoad).length==1) {
    tmp_hints[Object.keys(action.solToLoad)[0]] = action.solToLoad[Object.keys(action.solToLoad)[0]]
  } else { console.log("WE HAVE A PROBLEM")}

  return {
    ...state,
    [state.module]: {
      ...stateModule,
      studentState: {
        ...stateModule.studentState,
        [stateModule.currentView]: {
          ...stateModule.studentState[stateModule.currentView],
          code: code
        }
      },
      hintsGiven: {
        ...stateModule.hintsGiven,
        [stateModule.item]: tmp_hints[stateModule.item]
      }
    }
  }
}

function updateHints(state, action) {
  var stateModule = state[state.module];
  var tmp_hints = stateModule.hintsGiven;

  if (Object.keys(action.hintsGiven).length==1) {
    tmp_hints[Object.keys(action.hintsGiven)[0]] = action.hintsGiven[Object.keys(action.hintsGiven)[0]]
  } else { console.log("WE HAVE A PROBLEM")}

  return {
    ...state,
    [state.module]: {
      ...stateModule,
      hintsGiven: {
        ...stateModule.hintsGiven,
        [stateModule.item]: tmp_hints[stateModule.item]
      }
    }
  }
}

function updateCountdown(state, action) {
  var stateModule = state[state.module];
  var tmp_countdown = stateModule.countdown;

  if (Object.keys(action.time).length==1) {
    tmp_countdown[Object.keys(action.time)[0]] = action.time[Object.keys(action.time)[0]]
  } else { console.log("WE HAVE A PROBLEM")}

  return {
    ...state,
    [state.module]: {
      ...stateModule,
      countdown: {
        ...stateModule.countdown,
        [stateModule.item]: tmp_countdown[stateModule.item]
      }
    }
  }
}

export default rootReducer;
