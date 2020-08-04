import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE, USER_LOGGED } from "../actionTypes";

import { karelDB } from '../../firebase/firebase';

var logData = {
  type: '',
  date: '',
  userId: '',
  currentView: '',
  data: ''
}
/*
Log structure:
{
type: type of interaction,
date: date of interaction,
user: user that executed the interaction,
data: state data due to interaction
}

We are logging: 1. changes to code; 2. button clicks (type of button)
*/

export function logActions({ getState, dispatch }) {
  return function(next){
    return function(action){
      const state = getState();
      var log_to_DB = false;

      switch (action.type) {

        case UPDATE_CODE:
          logData.type = action.type;
          logData.date = (new Date()).toISOString();
          logData.userId = state.userId;
          logData.currentView = state.currentView;
          logData.data = action.code;
          log_to_DB = true;

          break;

        case RUN_CODE:
          logData.type = action.run_type;
          logData.date = (new Date()).toISOString();
          logData.userId = state.userId;
          logData.currentView = state.currentView;
          logData.data = state.studentState ? state.studentState[state.currentView].code : '';
          log_to_DB = true;

          break;

        case UPDATE_CURRENT_VIEW:
          logData.type = action.type;
          logData.date = (new Date()).toISOString();
          logData.userId = state.userId;
          logData.currentView = state.currentView;
          logData.data = action.view;
          log_to_DB = true;

          break;

        case PRE_ITEM_COMPLETE:
          logData.type = action.type;
          if (action.userId) {
            logData.userId = action.userId;
            dispatch({
              type: USER_LOGGED,
              payload: action.userId
            })
          }
          else { logData.userId = state.userId; }
          logData.date = (new Date()).toISOString();
          logData.currentView = state.currentView;
          logData.data = state.currentView;
          log_to_DB = true;

          break;

      }

      if (log_to_DB) {
        karelDB.push().set(logData);
      }

      //return dispatch({ type: action.type });

      return next(action);
    }
  }
}
