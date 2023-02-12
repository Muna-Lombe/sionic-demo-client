import * as consts from "../actions/actionTypes";
import { fromType } from "../utilities/StateLoader";

export default function customReducer(action, model, session) {
  // console.log("acrion", action)
  const verb =()=> fromType(action.type).getActionWord()
  const defaultTarget =() => fromType(action.type).getModelName()
  const isTargetModel = (target=defaultTarget()) => model.modelName === target
  const {type, payload=[], meta={}} = action
  // console.log("acrion", type, payload, verb(), isTargetModel(), model.modelName)
  
  function batchDo({customFn,modelAction, data}){
  
    customFn ? 
      customFn()
      :(function(){
        console.log("somn",modelAction.modelName,)
        const res = modelAction.create(data)
        console.log("res",res)
      })()
  }

  // if(model.modelName !== target()) return session.state;
  switch (true){
    case type.includes("FETCH_SUCCESS"):
      break;

    case verb()=== "FETCH_DATA" && meta?.requestStatus?.includes(consts.FULFILLED.toLocaleLowerCase()):
      const doCreate = (d) => {

        Object.values(d).forEach(o => {
          model.create(o)
          // console.log("res", res)
        })
        

      }
      const customDispatch = () => {
        for (const [m, d] of payload) {
          // console.log("m & d", m,d)
          if (isTargetModel(m)) {
            // console.log("is", m, "target model? : ", isTargetModel(m))
            const result = isTargetModel(m) ? doCreate(d) : ''
          }
        }
      }
      

      batchDo({ customFn: customDispatch })
      
      break;

    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.CREATE+'_'+model.modelName):
      batchDo({modelAction:model, data:payload})
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.UPDATE+model.modelName):
      model.withId(payload.id).update(payload);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.REMOVE+model.modelName):
      model.withId(payload.id).delete();
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.ADD_TO+model.modelName):
      model.withId(payload.productId).orders.add(payload.order);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.REMOVE_FROM+model.modelName):
      model.withId(payload.productId).orders.remove(payload.orderId);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (consts.ASSIGN+model.modelName):
      model.withId(payload.productId).categoryId = payload.categoryId;
      // session.reduce();
      break;
    default:
      return session.state
  }
  return session.state;
};
