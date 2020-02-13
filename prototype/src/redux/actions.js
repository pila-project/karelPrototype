import { UPDATE_STATUS, UPDATE_CODE, UPDATE_CURRENT_ID } from "./actionTypes";

export function updateStatus(status) {
    return { type: UPDATE_STATUS, status }
};

export function updateCode(code) {
    return { type: UPDATE_CODE, code }
}

export function updateCurrentId(id) {
    return { type: UPDATE_CURRENT_ID, id }
}