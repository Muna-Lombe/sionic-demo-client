import { attr,fk, many, Model, ORM } from "redux-orm";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN, actions } from "../actions/actionTypes";
import customReducer from "./reducer";




class ProductCategory extends Model {
    static reducer(action, ProductCategory, session) {
        switch (action.type) {
            case "orm/ProductCategory/setCurrCatId":
                // session.ProductCategory.options.currCatId = action.payload //set("currCatId",action.payload)
                console.log("", session)
                break;
        
            default:
                customReducer({session, model:ProductCategory, action})
                break;
        }
    }
}
// ProductCategory.initialState = {currCatId: 0}
ProductCategory.modelName = 'ProductCategory';
ProductCategory.fields = {
    id: attr(),
    name: attr(),
    // currCatId: attr()
    // products: many('Product', 'Productcategory'),
    
}

ProductCategory.options = {
    idAttribute: 'id'
}
export const [updatedProductCategory, removedProductCategory, addedProductCategory, createdProductCategory, addedProductCategoryTo, removedProductCategoryFrom,] = actions().createDefaultFor('ProductCategory')
export const upsertCurrCatId = actions().createCustomFor('ProductCategory', 'setCurrCatId')

export default ProductCategory;
