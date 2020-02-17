import React from 'react'
import { UPDATE_STATUS,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_LOCALE } from "../actionTypes";
import { STATUS, VIEW, IDs } from "../../constants"

const initialState = {
    locale: 'en',
    currentView: 'dashboard',
    studentState: {} 
    
    // Student state will be populated as the student works through
    // the exam. Here is an example of what studentState could
    // look like.
    
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
        case UPDATE_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.view
            }
        case UPDATE_STATUS:
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
        case UPDATE_CODE:
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
        case UPDATE_LOCALE:
            return {
                ...state,
                locale: action.locale
            }
        default:
            return state
    }
};

export default rootReducer;