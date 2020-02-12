export const selectProblemsByID = (store, id) => {
    return store.learningPaths[id].problems;
}

export const selectPathTypeByID = (store, id) => {
    return store.learningPaths[id].pathType;
}
