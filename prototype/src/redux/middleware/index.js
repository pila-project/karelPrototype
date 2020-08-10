import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE, RUN_DONE, USER_LOGGED } from "../actionTypes";

//import { DB } from '../../firebase/firebase';
import * as FireStoreService from '../../firebase/firebase';

var loggedData = {
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
          loggedData.type = action.type + '_' + action.codeUpdate.userAction;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.currentView = state.currentView;
          loggedData.data = action.codeUpdate.code;
          log_to_DB = true;
          break;

        case RUN_CODE:
          loggedData.type = 'BUTTON_CLICK_' + action.runData.runType;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.currentView = state.currentView;
          if (action.runData.code) {
            loggedData.data = action.runData.code;
          } else {
            loggedData.data = '';
          }
          log_to_DB = true;

          break;

        case UPDATE_CURRENT_VIEW:
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.currentView = state.currentView;
          loggedData.data = action.view;
          log_to_DB = true;

          break;

        case RUN_DONE:
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.currentView = state.currentView;
          loggedData.data = action.correct == false ? 'unsuccessful' : 'successful';
          log_to_DB = true;
          break;

        case PRE_ITEM_COMPLETE:
          loggedData.type = action.type;
          if (action.userId) {
            loggedData.userId = action.userId;
            dispatch({
              type: USER_LOGGED,
              payload: action.userId
            })
          }
          else { loggedData.userId = state.userId; }
          loggedData.date = (new Date()).toISOString();
          loggedData.currentView = state.currentView;
          loggedData.data = state.currentView;
          log_to_DB = true;

          break;

      }

      if (log_to_DB) {
        //real-time DB:
        //karelDB.push().set(loggedData);

        //firestore:
        FireStoreService.createDataLog(loggedData)

      }

      //return dispatch({ type: action.type });

      return next(action);
    }
  }
}
