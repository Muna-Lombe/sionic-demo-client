import { Model, ORM } from "redux-orm";
import { createStore, combineReducers } from "redux";
import { createReducer } from "redux-orm";


class Product extends Model {}
Product.modelName = 'Product';

class Order extends Model {}
Order.modelName = 'Order';

const orm = new ORM();
orm.register(Product, Order);

const rootReducer = combineReducers({
    orm: createReducer(orm), // This will be the Redux-ORM state.
    // … potentially other reducers
});
const store = createStore(rootReducer);

const session = orm.session();

session.Product.create({
    id: 1,
    name: 'Don Quixote',
});