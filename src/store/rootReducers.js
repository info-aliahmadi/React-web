import { combineReducers } from "@reduxjs/toolkit";
import auth from './infra/auth.reducer';
import menu from './infra/menu.reducer';

export default combineReducers({
  auth:auth,
  menu:menu,
  // ddsd: createReducer([], {
  //   [addTodo]: (state, action) => {
  //     state.push({ text: action.payload, completed: false });
  //   }})
})


