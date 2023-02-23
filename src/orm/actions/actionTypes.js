import { createAction } from "@reduxjs/toolkit";

export const [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING, FETCH_DATA, SELECT_PRODUCT] 
= ['UPDATE', 'REMOVE', 'ADD', 'CREATE', 'ADD_TO', 'REMOVE_FROM', 'ASSIGN', 'FULFILLED', 'SET_LOADING', 'CLEAR_LOADING', 'FETCH_DATA', 'SELECT_PRODUCT'];
export function actions(){
  return {
  createCustomFor: (model, type) => createAction(`orm/${model}/` + type),
  createDefaultFor: (model)=>new Array(10).fill().map((i, d) => {
    return i = createAction(`orm/${model}/` + [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d])
  })
}};
// export const [updated, removed, added, created, addedTo, removedFrom, assigned, fulfilled, setLoading, clearedLoading] = actions

