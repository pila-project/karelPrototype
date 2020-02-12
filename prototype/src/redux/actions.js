import { UPDATE_STATUS, UPDATE_CODE, UPDATE_CURRENT_ID } from "./actionTypes";

export function updateStatus(payload) {
    return { type: UPDATE_STATUS, payload }
};

export function updateCode(payload) {
    return { type: UPDATE_CODE, payload }
}

export function updateCurrentID(payload) {
    return { type: UPDATE_CURRENT_ID, payload }
}