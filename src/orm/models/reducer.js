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
        const res = modelAction.create(data[k])
        console.log("res",res)
      })
  }

  // if(model.modelName !== target()) return session.state;
  switch (true){
    case action.type.includes("FETCH_SUCCESS"):
      // console.log("success", action, model.modelName)
      // const doCreate = (d) => {
      //   Object.values(d).forEach(o => {
      //     model.create(o)
      //     // console.log("res", res)
      //   })
      // }
      // const customDispatch = () => {
      //   for (const [m, d] of action.payload) {
      //     if (isTargetModel(m)) {
      //       console.log("is", m, "target model? : ", isTargetModel(m))
      //       const result = isTargetModel(m) ? doCreate(d) : ''
      //     }
      //   }
      // }
      // batchDo({ customFn: customDispatch })
      // // console.log("result", session.state)

      // session.state = {...state, [model.modelName]:batchDo({customFn:customDispatch})}
      break;

    case action.meta?.requestStatus.includes(consts.FULFILLED.toLocaleLowerCase()):
      // console.log("fullfilled",session.state)
      const doCreate = (d) => {
        Object.values(d).forEach(o => {
          model.create(o)
          // console.log("res", res)
        })
      }
      const customDispatch = () => {
        for (const [m, d] of action.payload) {
          if (isTargetModel(m)) {
            console.log("is", m, "target model? : ", isTargetModel(m))
            const result = isTargetModel(m) ? doCreate(d) : ''
          }
        }
      }
      batchDo({ customFn: customDispatch })
      // console.log("result", session.state)
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
