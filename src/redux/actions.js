import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE, UPDATE_CODE, UPDATE_LOCALE, UPDATE_CURRENT_VIEW, UPDATE_ITEM, RUN_CODE, RUN_DONE, USER_LOGGED, END_SESSION, UPDATE_USERID, TIMEDOUT, UPDATE_COUNTDOWN } from "./actionTypes";

import i18n from "i18n";
import Blockly from 'blockly/core';
import { en, fr } from 'blocklyTranslations.js'

export function updateUserId(userId) {
    return {type: UPDATE_USERID, userId }
}

export function updateStatus(status) {
    return { type: UPDATE_STATUS, status }
};

export function updateCode(codeUpdate) {
  return { type: UPDATE_CODE, codeUpdate }
}

export function runCode(runData) {
  return { type: RUN_CODE, runData}
}

export function runDone(correct) {
  return { type: RUN_DONE, correct}
}

export function updateCurrentView(view) {
  return { type: UPDATE_CURRENT_VIEW, view }
}

export function updateItem(item) {
  return { type: UPDATE_ITEM, item }
}

export function problemComplete() {
  return {type: PROBLEM_COMPLETE}
}

export function preItemComplete(userId) {
  if (userId) { return {type: PRE_ITEM_COMPLETE, userId} }
  else { return {type: PRE_ITEM_COMPLETE} }
}

export function userLogged(userId) {
  return {type: USER_LOGGED, userId}
}

export function timedOut() {
  return {type: TIMEDOUT}
}

export function updateCountdown(time) {
  return {type: UPDATE_COUNTDOWN, time}
}

export function endSession() {
  return {type: END_SESSION}
}

// Create an action with side effects using redux-thunk
export function updateLocale(locale) {
    return dispatch => {
        // Side effects ---------------
        if (locale == 'en'){
            i18n.changeLanguage('en');
            Blockly.setLocale(en);
        } else if(locale == 'fr'){
            i18n.changeLanguage('fr');
            Blockly.setLocale(fr);
        }
        // ----------------------------
        dispatch({ type: UPDATE_LOCALE, locale }); // Send action to reducer
    }
}
