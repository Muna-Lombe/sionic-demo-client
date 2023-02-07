
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN, FULFILLED, SET_LOADING, CLEAR_LOADING} from "../actions/actionTypes";
import { fromType } from "../utilities/StateLoader";
import { session as externalSession } from "./rootOrmReducer";

 function reduce({state, passedSession, action, modelClass, getCurrent}){
    // console.log("model",session, action, modelClass)
    const session = passedSession||externalSession;
    // console.log('1st call', );
    if(getCurrent) return externalSession.state;
    //  console.log('2nd call', action);

    if(action.type.includes("@@")) return session.state;
    // console.log('3rd call');

    const {payload, type}= action; 
    
    
    const [target, verb] = type.includes('fulfilled') ? [fromType(type).getModelName(),"FULFILLED"] : type.includes("orm/") ? type.split("/")[1].split("_").reverse() :type.split("_").reverse();
    const model = modelClass || session[target];
    // console.log("t_v", session.state[target] )
    //  if (session.state[modelClass.name].meta){
    //      session.state[target].meta["DATA-LOADED"] = false
    //  }
     console.log("stateless", verb, target, model)

    switch(verb){
        case 'load':
            console.log("",verb, target, action)
            break;
        case CREATE:
            console.log("CREATE CALLED", verb,target, payload)
            model.create(payload);
            // session.reduce();
            break;
        case UPDATE:
            model.withId(payload.id).update(payload);
            // session.reduce();
            break;
        case REMOVE:
            model.withId(payload.id).delete();
            // session.reduce();
            break;
        case ADD_TO:
            model.withId(payload.productId).orders.add(payload.order);
            // session.reduce();
            break;
        case REMOVE_FROM:
            model.withId(payload.productId).orders.remove(payload.orderId);
            // session.reduce();
            break;
        case ASSIGN:
            model.withId(payload.productId).categoryId = payload.categoryId;
            // session.reduce();
            break;
        case SET_LOADING:
            console.log("peace",target,verb, session.state)
            break;
        case CLEAR_LOADING:
            console.log("peace", target, verb, session.state)
            break;
        case FULFILLED:
            console.log('state fulfilled', state, session.state)
            //session.state = state//{...state, [fromType(action.type).getModelName()]:payload};
            // return session.state
            
            break;
        default:
            console.log("def prods", session.state.Product);

            return session.state;
    }
    // console.log("should be updated state", session.state)
    return session.state;
};
export default reduce;
  