import React from 'react'
import { UPDATE_STATUS, UPDATE_CODE } from "../actionTypes";
import { STATUS, VIEW } from "../constants.js"

const initialState = {
    studentState: {
        cmd1: {
            status:STATUS.UNVISITED,
            code:''
        },
        cmd2: {
            status:STATUS.UNVISITED,
            code:''
        }
    }
};
  
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_STATUS:
            console.log(action);
            return {
                ...state,
                studentState: {
                    ...state.studentState,
                    [action.payload.id]: {
                        ...state.studentState[action.payload.id],
                        status: action.payload.status
                    }
                }
            }
        default:
            return state
    }
};

export default rootReducer;