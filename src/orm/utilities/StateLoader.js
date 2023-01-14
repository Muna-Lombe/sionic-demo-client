import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../assets/tests/jsonServer/db"
import { CREATE } from "../actions/actionTypes"
import { ThunkTypes } from "../actions/thunkTypes";
import  reduce from "../reducers/entitiesReducer"

export async function customStateUpdater(session, action) {
  // console.log("in customStateUpdater, getting state")
  let state = false;//= await reduce({getCurrent:true});
  if (action.type.includes("orm/load_")) {
    // if (action.type !== "orm/load_ProductVariationPropertyListValues/fulfilled") return 0;
    console.log("fetch done...", action)
    state = reduce({state:session.state, action, modelClass: session["Product"] })

    // let modelClass = session.sessionBoundModels[fromType(action.type).getModelName()]
    
    // session.sessionBoundModels.forEach(async function (modelClass, idx) {
    //   console.log("in customStateUpdater, finished loading model", modelClass.modelName)
      
    //   if (idx === session.sessionBoundModels.length -1 ){
    //     console.log("reducing state...")
    //     state= reduce({action, modelClass})
    //     console.log("reduced state", state)
    //     // if (state[modelClass.name]?.meta){

    //     //   state[modelClass.name].meta["DATA-LOADED"] = true;
    //     // }
    //   }
    // });
    // return 0;
  }

  if(action.type.includes("_") && !action.type.includes('load_')){
    console.log("in customStateUpdater, updating one model instate", action)

    state = await reduce({session, action})
  }
  
  // console.log("returned state", state)
  // if(state === undefined) throw Error("Returned state is undefined!") ;
  console.log("return state after update", state)
  return state ? state : await reduce({ getCurrent: true });
}

function reduceState({props}) {
  let state;
  for (const e of props.data) {
    // console.log("modelname", props.model.modelName)
    let type = props.model.modelName + "_" + CREATE
    // let payload = { [props.model.modelName]: { ...e } }
    let payload = { ...e }
    // console.log("payload", payload)
    let action = { type, payload }
    
    state = reduce({action})
  }
  return state;
}

export const load = async (model, thunkFulfilled) => {
  if (model) {
    
    // console.log("path", url, searchParams)
    let data = await db.makeRequest(model.dataName, model.range)
    // console.log("data", data) 
    const props = { data, model }
    const action = { ...data }
    // return props
    // reduceState({props})
    // console.log("returned state", newState)

    return action
  }
  // if(thunkFulfilled){
  //     // session
  // }

}

export const StateLoadMiddleware = async(Store) => /*ThunkTypes.forEach(async (model, idx) =>*/ {

  let thunkaction = createAsyncThunk(`orm/load_${ThunkTypes[0]/*model*/.dataName}`, async (args, thunkApi) => {
    return await load(ThunkTypes[0])//model)
  })
  console.log('dispatch update', thunkaction())
  await Store.dispatch(thunkaction())

}//)

const dispatchMany =(props, thunkAPI)=>{
  Object.keys(props.response).forEach((k,i)=>{
    thunkAPI.dispatch({
      type:"orm/"+props.modelName+props.actionType,
      payload:props.response[k]
    })
  })
}

export const asyncThunk = createAsyncThunk('orm/SET_LOADING', async (arg, thunkAPI) => {
  try {
    ThunkTypes.forEach(async(model, idx)=>{
      const response = await load(model);
      // console.log("response", response)
      const action = {type:"orm/"+model.modelName+"/CREATE", payload: response}
      const props = { response, actionType: "/CREATE", modelName: model.modelName }
      thunkAPI.dispatch(action)

      // dispatchMany(props, thunkAPI)
    })
    
    // thunkAPI.dispatch(action)
    // return response[0];
    // return thunkAPI.dispatch({type:"orm/CLEAR_LOADING"})
  } catch (error) {
    thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
    return error;
  }
});

export const fromType = (type) => {
  
  String.prototype.singular = (str) => { 
    return str.endsWith("s") ?
          str.slice(0, str.length - 1)
          : str.endsWith("es") ?
              str.slice(0, str.length - 2)
                : str.endsWith("ies") ?
                  str.slice(0, str.length - 3)
                  : str
  }
  const [orm,model, actionWord, dispatchStatus] = type.includes("@@") ? type : type.includes("orm/") ? type.split("/",) : type.split("_")[1]
  return {
    
    getModelName: () => model,
    getActionWord: () => actionWord,
    getDispatchStatus: () => dispatchStatus
  }
}
