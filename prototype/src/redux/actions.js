import { CHANGE_LEVEL, CHANGE_STATUS, CHANGE_VIEW } from "./actionTypes";

export function changeLevel(payload) {
    return { type: CHANGE_LEVEL, payload }
};

export function changeStatus(payload) {
    return { type: CHANGE_STATUS, payload }
};

export function changeView(payload) {
    return { type: CHANGE_VIEW, payload }
}