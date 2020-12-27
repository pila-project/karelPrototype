export const selectCodeByCurrentView = (store) => {
    let currentView = store.currentView;
    if (store.studentState[currentView] != undefined){
        return (store.studentState[currentView].code);
    } else {
        return;
    }
}