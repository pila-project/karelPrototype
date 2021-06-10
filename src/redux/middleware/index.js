import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE, RUN_DONE, USER_LOGGED, TIMEDOUT, HINTCLICK, LOAD_SOLUTION } from "../actionTypes";

//import { DB } from '../../firebase/firebase';
import * as FireStoreService from '../../firebase/firebase';

var loggedData = {
  type: '',
  date: '',
  module: '',
  userId: '',
  currentView: '',
  item: '',
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
      var stateModule = state[state.module]

      switch (action.type) {

        case UPDATE_CODE:
          loggedData.type = action.type + '_' + action.codeUpdate.userAction;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = action.codeUpdate.code;
          log_to_DB = true;
          break;

        case RUN_CODE:
          loggedData.type = 'BUTTON_CLICK_' + action.runData.runType;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
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
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = action.view;
          if (state.userId) {
            log_to_DB = true;
          }

          break;

        case RUN_DONE:
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = action.correct == false ? 'unsuccessful' : 'successful';
          log_to_DB = true;
          break;

        case TIMEDOUT:
          console.log('I AM IN THE MIDDLEWARE!')
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = '';

          log_to_DB = true;
          break;

        case HINTCLICK:
          console.log('I AM IN THE MIDDLEWARE!')
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = action.hint_obj;

          log_to_DB = true;
          break;

        case LOAD_SOLUTION:
          console.log('I AM IN THE MIDDLEWARE!')
          loggedData.type = action.type;
          loggedData.date = (new Date()).toISOString();
          loggedData.userId = state.userId;
          loggedData.module = state.module;
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = '';

          log_to_DB = true;
          break;

        case PRE_ITEM_COMPLETE:
          loggedData.type = action.type;
          loggedData.module = state.module;
          if (action.userId) {
            loggedData.userId = action.userId;
            dispatch({
              type: USER_LOGGED,
              payload: action.userId
            })
          }
          else { loggedData.userId = state.userId; }
          loggedData.date = (new Date()).toISOString();
          loggedData.currentView = stateModule.currentView;
          loggedData.item = stateModule.item;
          loggedData.data = stateModule.currentView;
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
