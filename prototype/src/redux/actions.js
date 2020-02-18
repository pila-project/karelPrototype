import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE, UPDATE_CODE, UPDATE_CURRENT_VIEW } from "./actionTypes";

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