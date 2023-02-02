import { createAction } from "@reduxjs/toolkit";
import reduce  from "../reducers/entitiesReducer";

export const [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING, FETCH_DATA] 
= ['UPDATE', 'REMOVE', 'ADD', 'CREATE', 'ADD_TO', 'REMOVE_FROM', 'ASSIGN', 'FULFILLED', 'SET_LOADING', 'CLEAR_LOADING', 'FETCH_DATA'];

export const [updated, removed, added, created, addedTo, removedFrom, assigned, fulfilled, setLoading, clearedLoading] = new Array(10).fill().map((i,d) => {
  return i =(model)=> createAction(`orm/${model}/` + [UPDATE, REMOVE, ADD, CREATE, ADD_TO, REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING][d])
});

