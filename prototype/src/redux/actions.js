import { UPDATE_STATUS, UPDATE_CODE, UPDATE_CURRENT_VIEW, UPDATE_LOCALE } from "./actionTypes";
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