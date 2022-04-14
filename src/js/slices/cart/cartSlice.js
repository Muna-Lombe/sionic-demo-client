import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Get from '../../../assets/tests/Get'


const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState({

})

export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    let get = new Get ()
    let pd = await get.ProductsByRange(10)
    console.log('get', pd)
    
    const products = [1,2,3,4,5,6,7,8].map((i) => Object.assign({"id":i, "product":i}))
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