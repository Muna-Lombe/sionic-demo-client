// import schema from "models/schema";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
// This gives us a set of "tables" for our data, with the right structure
// const initialState = schema.getDefaultState();

export default function entitiesReducer(state,session, action) {

    const {payload, type}= action;
    const [target, verb] = type.split("_")
    const modelname = target[0]+target.slice(1, target.length).toLowerCase()
;
    const model = session[target];
     
    switch(verb){
        case CREATE:
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
        default:
            return state;
    }
  }
  