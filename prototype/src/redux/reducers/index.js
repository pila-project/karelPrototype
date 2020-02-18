import React from 'react'
import Curriculum from 'Curriculum/SimpleCurriculum.js'
import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_CURRENT_ID } from "../actionTypes";
import { STATUS, VIEW, IDs } from "../../constants"

const initialState = {
  currentView: 'dashboard',
  studentState: {} 
  
  // Student state will be populated as the student works through
  // the exam. Here is an example of what studentState could
  // look 
  
  // Example of what studentState will look like with content
  // studentState: {
  //     learnCmd1: {
  //         status:STATUS.COMPLETED,
  //         code:''
  //     },
  //     learnCmd2: {
  //         status:STATUS.VISITED,
  //         code:''
  //     }
  // }

};

// Reducers can't update the redux store directly because it is immutable.
// So, reducers have to copy the store, modify it, and return the copy.
// All of the spread operators below are being used to create a copy of the state
// and selectively modify the part that needs to be changed based 
// on the action that was received. For example, when UPDATE_STATUS is 
// received, the `status` value of the item specified by state.currentView is updated.

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CURRENT_VIEW: return updateCurrentView(state, action)
    case UPDATE_STATUS: return updateStatus(state, action)
    case PRE_ITEM_COMPLETE: return preItemComplete(state, action)
    case PROBLEM_COMPLETE: return problemComplete(state, action)
    case UPDATE_CODE: return updateCode(state, action)
    default: return state
  }
};

function preItemComplete(state, action){
  let pre = Curriculum.getPre()
  let currId = state.currentView
  var index = Curriculum.getIndexFromPreId(currId)
  if(index < pre.length - 1) {
    // go to the next problem
    let nextId = pre[index + 1]['id']
    return {
      ...state,
      currentView: nextId
    }
  } else {
    // switch to the "learning" part of the test
    return {
      ...state,
      currentView: 'dashboard'
    }
  }
  
}

function updateCurrentView(state, action) {
  return {
    ...state,
    currentView: action.view
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
  return {
    ...state,
    currentView: 'dashboard',
    studentState: {
      ...state.studentState,
      [state.currentView]: {
        ...state.studentState[state.currentView],
        status: STATUS.COMPLETED
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
        code: action.code
      }
    }
  }
}

export default rootReducer;