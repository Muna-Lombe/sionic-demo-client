import * as consts from "../actions/actionTypes";
import { fromType } from "../utilities/StateLoader";

export default function customReducer(action, model, session) {
  // console.log("acrion", action)
  const verb = fromType(action.type).getActionWord()
  const target = fromType(action.type).getModelName()
  console.log("acrion", action, verb,model.modelName)
  
  function batchDo(modelAction, data){
  
    Object.keys(data).forEach((k) => {
      console.log(modelAction,data[k])
      modelAction.create(data[k])
    })
  }
  if(model.modelName !== target) return session.state;
  switch (verb + '_' + model.modelName){
    case consts.CREATE+'_'+model.modelName:
      console.log("creating...", action)
      // model.create(action.payload);
      batchDo(model, action.payload)
      // Object.keys(action.payload).forEach((k,i)=>{
      //   model.create(action.payload[k])
      // })
      
      // session.reduce();
      break;
    case consts.UPDATE+model.modelName:
      model.withId(action.payload.id).update(action.payload);
      // session.reduce();
      break;
    case consts.REMOVE+model.modelName:
      model.withId(action.payload.id).delete();
      // session.reduce();
      break;
    case consts.ADD_TO+model.modelName:
      model.withId(action.payload.productId).orders.add(action.payload.order);
      // session.reduce();
      break;
    case consts.REMOVE_FROM+model.modelName:
      model.withId(action.payload.productId).orders.remove(action.payload.orderId);
      // session.reduce();
      break;
    case consts.ASSIGN+model.modelName:
      model.withId(action.payload.productId).categoryId = action.payload.categoryId;
      // session.reduce();
      break;
    default:
      return session.state
  }
  return session.state;
};
