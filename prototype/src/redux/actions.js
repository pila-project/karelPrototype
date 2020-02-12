import { UPDATE_STATUS, UPDATE_CODE } from "./actionTypes";

export function updateStatus(payload) {
    return { type: UPDATE_STATUS, payload }
};

export function updateCode(payload) {
    return { type: UPDATE_CODE, payload }
}