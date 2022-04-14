import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Get from '../../../assets/tests/Get'


const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState({

})


export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    let get = new Get ()
    let pd = await get.ProductsByRange(10)
    
    let tags = [
        [6, 'День Рождения Гриши'],
        [5, 'Подарок коллегам'],
        [4, 'Подарок'],
        [5, 'Мишка'],
        [3, 'Мартышка'],
        [2, 'Игрушка'],
        [1, 'валентинки'],
    ]
    const sampleData = [
        [1, "some nice product 10% super CHEAP!",[tags[3],tags[4],tags[1]], 3000, [true, 5, (3000 - (3000*(5/100)))]],
        [3, "Great product 5% DISCOUNT", [tags[1],tags[2],tags[3]], 12000, [true, 5, (12000 - (12000*(5/100)))]],
        [5, "FACIAL CREAM NEW STOCK!", [tags[4],tags[3],tags[2]], 1500, [false]],
        [7, "some nice product 10% super CHEAP!",[tags[6],tags[4],tags[1]], 1000, [false]],
        [2, "Great new from somewhere stock super cheap product", [tags[2],tags[4],tags[6]], 9000, [true, 5, (9000 - (9000*(5/100)))]],
        [4, "FOR YOUR FACE GREAT NICE EVERYTHING NICE!", [tags[1],tags[3],tags[5]], 16000, [true, 5, (16000 - (16000*(5/100)))]],
        [6, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quidem ipsa fugit quod i", [tags[4],tags[3],tags[2]], 3500, [false]]
    ]
    
    const products = sampleData.map((i,idx) => Object.assign({
        id:idx ,
        product: {
            img_path_id:i[0],
            name: i[1],
            category_tags: i[2],
            price: i[3],
            isDiscounted: i[4]
        }
    }))
    return { products }
})
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        // productAdded(state, action) {
        //     const item = action.payload
        //     state.entities[item.id] = item
        // },
        // productUpdated: {
        //     reducer(state, action) {
        //         const{ itemId, updateData } = action.payload
        //         // PAUSE HERE FOR NOW!

        //     },
        //     prepare(itemId, updateData ) {
        //         return {
        //             payload: { itemId, updateData}
        //         }
        //     }
        // }

    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log('action payload:', action)
                productsAdapter.setAll(state, action.payload.products)
            })
    }
}) 
export const { selectAll: selectProducts } = productsAdapter.getSelectors(state => state.products)
export const selectProductIds = createSelector(
    selectProducts,
    product => product

)
export default productSlice.reducer