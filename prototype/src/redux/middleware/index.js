import { UPDATE_STATUS,PRE_ITEM_COMPLETE, PROBLEM_COMPLETE,UPDATE_CURRENT_VIEW, UPDATE_CODE, UPDATE_CURRENT_ID, UPDATE_LOCALE, RUN_CODE } from "../actionTypes";


export function checkCodeBase({ dispatch }) {
  return function(next){
    return function(action){
      switch (action.type) {
        case UPDATE_CODE:
          console.log('middleware')
          console.log(action)
      }

      //return dispatch({ type: action.type });

      return next(action);
    }
  }
}
