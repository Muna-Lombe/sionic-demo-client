
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN, FULFILLED } from "../actions/actionTypes";
import { session as currentSession } from "./rootOrmReducer";

export const reduce = (session, action, modelClass)=> {
    console.log("model",session, action, modelClass)
    const {payload, type}= action;
    if(type.includes("@@")) return session.state;
    const [target, verb] = type.includes('fulfilled') ? [type,"FULFILLED"] : type.includes("orm/") ? type.split("/")[1].split("_") :type.split("_");
    const model = modelClass || session[target] || currentSession[target];
    // console.log("model",model())

    

    switch(verb){
        case CREATE:
            model.create(payload[target]);
            // session.reduce();
            break;
        case UPDATE:
            model.withId(payload[target].id).update(payload[target]);
            // session.reduce();
            break;
        case REMOVE:
            model.withId(payload[target].id).delete();
            // session.reduce();
            break;
        case ADD_TO:
            model.withId(payload[target].productId).orders.add(payload[target].order);
            // session.reduce();
            break;
        case REMOVE_FROM:
            model.withId(payload[target].productId).orders.remove(payload[target].orderId);
            // session.reduce();
            break;
        case ASSIGN:
            model.withId(payload[target].productId).categoryId = payload[target].categoryId;
            // session.reduce();
            break;
        case FULFILLED:
            session.state = payload
            break;
        default:
            return session.state;
    }
    return session.state
}
export default function entitiesReducer(session, props) {
    for (const e of props.data) {
        // console.log("modelname", props.model.modelName)
        let type = props.model.modelName+"_"+CREATE
        let payload = {[props.model.modelName]:{...e}}
        // console.log("payload", payload)
        let action = {type, payload}
        // console.log("action", action)
        reduce(session, action)
    }
    return session.state;
  }
  