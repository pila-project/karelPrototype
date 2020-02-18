import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE, UPDATE_CODE, UPDATE_LOCALE, UPDATE_CURRENT_VIEW } from "./actionTypes";

import i18n from "i18n";
import Blockly from 'blockly/core';
import { en, fr } from 'blocklyTranslations.js'

export function updateStatus(status) {
    return { type: UPDATE_STATUS, status }
};

export function updateCode(code) {
    return { type: UPDATE_CODE, code }
}

export function updateCurrentView(view) {
  return { type: UPDATE_CURRENT_VIEW, view }
}

export function problemComplete() {
  return {type:PROBLEM_COMPLETE}
}

export function preItemComplete() {
  return {type:PRE_ITEM_COMPLETE}
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