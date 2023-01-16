import * as consts from "../actions/actionTypes";
import { fromType } from "../utilities/StateLoader";

export default function customReducer(action, model, session) {
  // console.log("acrion", action)
  const verb =()=> fromType(action.type).getActionWord()
  const defaultTarget =() => fromType(action.type).getModelName()
  const isTargetModel = (target=defaultTarget()) => model.modelName === target
  // console.log("acrion", action, target(), model.modelName)
  
  function batchDo({customFn,modelAction, data}){
  
    customFn ? 
      customFn()
      :Object.keys(data).forEach((k) => {
        console.log(modelAction,data[k])
        modelAction.create(data[k])
      })
  }

  // if(model.modelName !== target()) return session.state;
  switch (true){
    case action.meta?.requestStatus.includes(consts.FULFILLED.toLocaleLowerCase()):
      console.log("fullfilled",action ,)
      const customDispatch = () =>{
       for(const [m,d] of action.payload){// action.payload.forEach((m)=> {
         // const modelName = Object.keys(m)
          console.log(isTargetModel(m), d)  //isTargetModel(modelName))
          // action.meta.arg.dispatch({type: "orm/"+modelName+"/CREATE", payload:{...m[modelName]}})
          // return { type: "orm/" + modelName + "/CREATE", payload: { ...m[modelName] } }
          const doCreate = () => Object.values(d).forEach(o => model.create(o))
          const result = isTargetModel(m) ? doCreate() : ''
          return result
        }//)
      }
      batchDo({customFn:customDispatch})
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.CREATE+'_'+model.modelName):
      console.log("creating...", action)
      // model.create(action.payload);
      batchDo(model, action.payload)
      // Object.keys(action.payload).forEach((k,i)=>{
      //   model.create(action.payload[k])
      // })
      
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.UPDATE+model.modelName):
      model.withId(action.payload.id).update(action.payload);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.REMOVE+model.modelName):
      model.withId(action.payload.id).delete();
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.ADD_TO+model.modelName):
      model.withId(action.payload.productId).orders.add(action.payload.order);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.REMOVE_FROM+model.modelName):
      model.withId(action.payload.productId).orders.remove(action.payload.orderId);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.ASSIGN+model.modelName):
      model.withId(action.payload.productId).categoryId = action.payload.categoryId;
      // session.reduce();
      break;
    default:
      return session.state
  }
  return session.state;
};
