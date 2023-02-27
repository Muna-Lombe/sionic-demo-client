import types from "../actions/actionTypes";
import { fromType } from "../utilities/StateLoader";

export default function customReducer({session, model,action }) {
  // console.log("acrion", session, model.modelName, action)
  const verb =()=> fromType(action.type).getActionWord()
  const defaultTarget =() => fromType(action.type).getModelName()
  const isTargetModel = (target=defaultTarget()) => model.modelName === target
  const {type, payload=[], meta={}} = action
  // console.log("acrion", type, payload, verb(), isTargetModel(), model.modelName)
  
  function batchDo({customFn,modelAction, data}){
  
    customFn ? 
      customFn()
      :(function(){
        // console.log("somn",modelAction.modelName,)
        const res = modelAction.create(data)
        // console.log("res",res)
      })()
  }

  // if(model.modelName !== target()) return session.state;
  switch (true){
    case type.includes("FETCH_SUCCESS"):
      break;

    case verb()=== "FETCH_DATA" && meta?.requestStatus?.includes(types.FULFILLED.toLocaleLowerCase()):
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

    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.CREATE+'_'+model.modelName):
      batchDo({modelAction:model, data:payload})
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.ADD_TO+'_'+model.modelName):
      model.withId(payload.id)[payload.target].add(payload.target.data);
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.ADD + '_' + model.modelName):
      model.upsert(payload);
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.ASSIGN+'_'+model.modelName):
      model.withId(payload.productId).categoryId = payload.categoryId;
      // session.reduce();
      break;
    case ( isTargetModel() && verb() + '_' + model.modelName) === (types.UPDATE+'_'+model.modelName):

      if(!Number.isInteger(payload.id) && payload.id === "all"){
        model.all().update(payload.set)
      }
      if(Number.isInteger(payload.id)){
        model.withId(payload.id).update(payload.set);
        console.log("update", payload)
      }
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE + '_' + model.modelName):
      // model.withId(payload.id).delete();
      model.withId(payload.id).update(payload.set);

      // console.log("remove", payload)

      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE_FROM + '_' + model.modelName):
      model.withId(payload.id)[payload.target].remove(payload.target.id);
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.REMOVE_ALL_OF + '_' + model.modelName):
      model.all().update(payload.mergeObj)
      // model.withId(payload.id)[payload.target].remove(payload.target.id);
      // session.reduce();
      break;
    case (isTargetModel() && verb() + '_' + model.modelName) === (types.DELETE + '_' + model.modelName):
      model.withId(payload.id).delete();
      // session.reduce();
      break;
    default:
      return session.state
  }
  return session.state;
};
