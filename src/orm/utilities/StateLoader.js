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
// const payloadCreatorForMany = async (arg, thunkAPI) => {
//     try {
//       const compiledResponse = new Map()
//       ThunkTypes.forEach(async (model, idx) => {
//         const response = await load(model);
//         compiledResponse.set(model.modelName,response)
//         //#region 
//         // console.log("response", response)
//         // const action = { type: "orm/" + model.modelName + "/CREATE", payload: response }
//         // const props = { response, actionType: "/CREATE", modelName: model.modelName }
//         // compiledResponse.push({ [model.modelName]: response })
//         //#endregion
        
        
//       })
//       console.log(compiledResponse)//.dispatch(action)
//       return compiledResponse
//     } catch (error) {
//       thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
//       return error;
//     }
//   }
const payloadCreatorForMany = async (arg, thunkAPI) => {
  try {
    const promises = ThunkTypes.map(model => load(model));
    const responses = await Promise.all(promises);
    const compiledResponse = new Map();
    ThunkTypes.forEach((model, idx) => {
      compiledResponse.set(model.modelName, responses[idx]);
    });
    // await thunkAPI.dispatch({ type: 'FETCH_SUCCESS', payload: compiledResponse });
    // console.log("compiled", compiledResponse);
    return compiledResponse;
  } catch (error) {
    thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
    return error;
  }
}

const payloadCreatorForSingle =(model) =>{
  return async (arg, thunkAPI) => {
    try {
      const compiledResponse = Object.create([])
      // ThunkTypes.forEach(async (model, idx) => {
        const response = await load(model);
        // console.log("response", response)
        const action = { type: "orm/" + model.modelName + "/CREATE", payload: response }
        const props = { response, actionType: "/CREATE", modelName: model.modelName }
        compiledResponse.push({ [model.modelName]: response })
        // console.log(thunkAPI)//.dispatch(action)

      // })
      return compiledResponse
    } catch (error) {
      thunkAPI.dispatch({ type: 'FETCH_ERROR', error });
      return error;
    }
  }
}
export const asyncThunk = createAsyncThunk('orm/Models/FETCH_DATA', payloadCreatorForMany);

export const ormMiddlewares = Array(ThunkTypes.length-5).fill().map((e,i)=> {return e = createAsyncThunk('orm/'+ThunkTypes[i].modelName+'/FETCH_DATA', payloadCreatorForSingle(ThunkTypes[i])) })

export const fromType = (type) => {
  let orm, model, actionWord, dispatchStatus = ""; 

  
  if(type.includes("orm/")){
    // console.log("orm", type)
    const arr = type.split("/")
    orm = arr[0]; 
    model = arr[1];
    actionWord = arr[2];
    dispatchStatus = arr[3] ;
    
 }
  // type.startsWith("@@") ? type : type.includes("orm/") ? type.split("/",) : type.split("_")[1]
  return {
    
    getModelName: () => model,
    getActionWord: () => actionWord,
    getDispatchStatus: () => dispatchStatus
  }
}