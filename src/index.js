import React from 'react';
import ReactDOM from 'react-dom';
// import index from "./js/index";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createDispatchHook, Provider } from 'react-redux';
import { fetchProducts } from './js/slices/products/productsSlice';
import { HashRouter } from 'react-router-dom';
import getStore from './js/store';
import {  load, ormRootReducer } from './orm/reducers/rootOrmReducer';
import {ThunkTypes} from './orm/actions/thunkTypes';

getStore.reduxStore.dispatch(fetchProducts())
// getStore.reduxStore.dispatch(loadCategories())


ThunkTypes.forEach(async(model,idx)=>{
  let thunkaction = createAsyncThunk(`orm/load${model.dataName}`, async()=>{
    return await load(model)
  })
  // const updateAction = 
  await getStore.reduxStore.dispatch(thunkaction())

  // if(idx === ThunkTypes.length-1 && updateAction.type.includes('fulfilled')){
  //   console.log('sess', updateAction)
  //   // ormRootReducer(undefined,updateAction)
  //   // getStore.reduxStore.dispatch(updateAction)
  //   // await load(false, true)
  // }
})

console.log(getStore.reduxStore.getState())
// loadProducts()
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={getStore.reduxStore}>
        <App />
      </Provider>
    </HashRouter>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
