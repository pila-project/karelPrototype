import React from 'react'

import Curriculum from 'Curriculum/SimpleCurriculum.js'
import { UPDATE_STATUS, PRE_ITEM_COMPLETE, PROBLEM_COMPLETE, POST_ITEM_COMPLETE, UPDATE_CURRENT_VIEW, UPDATE_ITEM, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE, USER_LOGGED, END_SESSION, UPDATE_USERID, TIMEDOUT, UPDATE_COUNTDOWN } from "../actionTypes";
import { STATUS, VIEW, IDs } from "../../constants"
import { REHYDRATE } from 'redux-persist'

const initialState = {
  locale: 'en',
  currentView: '',
  item: '',
  studentState: {},
  userId: '',
  autofillUserId: true,
  countdown: {},
  points: 0
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
    default: return state
  }
};

function endSession(state, action) {
  let pre = Curriculum.getCollection('pre')
  let initialPage = pre[0].id; // Return user to initial page, but without autofilling user id
  return {
    ...initialState,
    autofillUserId: false,
    currentView: pre[0].id
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

function preItemComplete(state, action){
  let pre = Curriculum.getCollection('pre')
  let currId = state.currentView
  var index = Curriculum.getIndexFromId(currId,pre)
  if(index < pre.length - 1) {
    // go to the next problem
    let nextId = pre[index + 1]['id']
    return {
      ...state,
      currentView: nextId,
      item: nextId
    }
  } else {
    // switch to the "learning" part of the test
    return {
      ...state,
      currentView: 'dashboard',
      item: 'dashboard'
    }
  }
}

function postItemComplete(state, action){
  let post = Curriculum.getCollection('post')
  var index = 0
  if ('index' in action) {
    index = action.index;
  } else {
    let currId = state.currentView
    index = Curriculum.getIndexFromId(currId,post)
  }
  if(index < post.length - 1) {
    // go to the next problem
    let nextId = post[index + 1]['id']
    return {
      ...state,
      currentView: nextId,
      item: nextId
    }
  } else {
    // switch to the "learning" part of the test
    return {
      ...state,
      currentView: 'goodbye',
      item: 'goodbye'
    }
  }
}

function updateCurrentView(state, action) {
  return {
    ...state,
    currentView: action.view
  }
}

function updateItem(state, action) {
  return {
    ...state,
    item: action.item
  }
}

function updateStatus(state, action) {
  return {
    ...state,
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        status: action.status
      }
    }
  }
}

function problemComplete(state, action) {
  var new_points = state.points;
  if (action.item != null) {
    new_points += 100;
  }

  return {
    ...state,
    currentView: 'dashboard',
    points: new_points,
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        status: STATUS.COMPLETED,
      }
    }
  }
}

function updateCode(state, action) {
  return {
    ...state,
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        code: action.codeUpdate.code
      }
    }
  }
}

function runCode(state, action) {
  return {
    ...state,
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        run_type: action.runData.runType
      }
    }
  }
}

function timedOut(state, action) {
  console.log('I GOT TRIGGERED IN THE REDUCER!')
  return {
    ...state,
    currentView: 'dashboard',
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        status: STATUS.TIMEDOUT
      }
    }
  }
}

  function updateCountdown(state, action) {

    var tmp_countdown = state.countdown;

    if (Object.keys(action.time).length==1) {
      tmp_countdown[Object.keys(action.time)[0]] = action.time[Object.keys(action.time)[0]]
    } else { console.log("WE HAVE A PROBLEM")}

    return {
      ...state,
      countdown: tmp_countdown
    }
}

export default rootReducer;
