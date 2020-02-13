export const selectCodeByCurrentId = (store) => {
    let currentId = store.currentId;
    if (store.studentState[currentId] != undefined){
        return (store.studentState[currentId].code);
    } else {
        return;
    }
}