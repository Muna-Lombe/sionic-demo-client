import { createAction } from "@reduxjs/toolkit";


const constantsArr = ['UPDATE', 'REMOVE', 'ADD', 'CREATE', 'ADD_TO', 'REMOVE_FROM', 'REMOVE_ALL_OF', 'ASSIGN', 'FULFILLED', 'SET_LOADING', 'CLEAR_LOADING', 'FETCH_DATA', 'SELECT_PRODUCT', 'DELETE']
export const [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, REMOVE_ALL_OF, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING, FETCH_DATA, SELECT_PRODUCT, DELETE] 
= constantsArr;
export function actions(){
  return {
  createCustomFor: (model, type) => createAction(`orm/${model}/` + type),
  createDefaultFor: (model)=> Object.fromEntries(constantsArr.map((i, d) => {
    // const key = [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d]
    const action = createAction(`orm/${model}/` + i)
    return[i,action]
    // return [i = createAction(`orm/${model}/` + [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d])]
  }))
}};
// export const [updated, removed, added, created, addedTo, removedFrom, assigned, fulfilled, setLoading, clearedLoading] = actions

