export const selectCodeByCurrentView = (store) => {
    let currentView = store.currentView;
    
    if ('studentState' in store) {
      if (store.studentState[currentView] != undefined){
        return (store.studentState[currentView].code);
      } else {
        return;
      }
    } else { return; }

}
