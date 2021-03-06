import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import React from 'react'
import Get from '../../../assets/tests/Get'
import categoriesSlice from '../filters/categoriesSlice'

const productsAdapter = createEntityAdapter()
const initialState = productsAdapter.getInitialState({
    currCatId: 0
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
    let productStores = [
        {id: 1, name:"Davies' Store"},
        {id: 2, name:"Clear fawn"},
        {id: 3, name:"About face"},
        {id: 4, name:"Avita"}
    ]
    const sampleData = [
        [1, "some nice product 10% super CHEAP!",[tags[3],tags[4],tags[1]], productStores[0], 3000, [true, 5, (3000 - (3000*(5/100)))]],
        [3, "Great product 5% DISCOUNT", [tags[1],tags[2],tags[3]], productStores[1], 12000, [true, 5, (12000 - (12000*(5/100)))]],
        [5, "FACIAL CREAM NEW STOCK!", [tags[4],tags[3],tags[2]], productStores[2], 1500, [false]],
        [7, "some nice product 10% super CHEAP!",[tags[6],tags[4],tags[1]], productStores[3], 1000, [false]],
        [2, "Great new from somewhere stock super cheap product", [tags[2],tags[4],tags[6]], productStores[0], 9000, [true, 5, (9000 - (9000*(5/100)))]],
        [4, "FOR YOUR FACE GREAT NICE EVERYTHING NICE!", [tags[1],tags[3],tags[5]], productStores[1], 16000, [true, 5, (16000 - (16000*(5/100)))]],
        [6, "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quidem ipsa fugit quod i", [tags[4],tags[3],tags[2]], productStores[3], 3500, [false]]
    ]
    
    const products = sampleData.map((i,idx) => Object.assign({
        id:idx ,
        product: {
            img_path_id:i[0],
            name: i[1],
            category_tags: i[2],
            store: i[3],
            price: i[4],
            isDiscounted: i[5]
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
        setCurrCatId(state,action) {
            console.log('newState', state.ids)
            const newCatId = action.payload
            state.currCatId = newCatId
    
        }
    },
    extraReducers:(builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                // console.log('action payload:', action)
                productsAdapter.setAll(state, action.payload.products)
            })
    }
}) 
export const { setCurrCatId} = productSlice.actions
export const { selectAll: selectProducts } = productsAdapter.getSelectors(state => state.products)

export const selectProductIds = createSelector(
    selectProducts,
    product => product

)
export const filterProducts = (catId = 0) => createSelector(
    selectProducts,
    state  => state.products,
    state => state.products.currCatId,
    (products, state)=>{
        let currCatId = state.currCatId
        console.log('curr',currCatId)
        if (currCatId === 0) return products
        return products.filter((p)=>{
            return p.product.category_tags.some((e)=> {
                return Number.parseInt(e[0]) === Number.parseInt(currCatId)
            })  && p
    })
    }
) 
// {
//             console.log('newState', state.ids)
//             const catId = action.payload
//             let oldState = state.entities
            
//             let filtState = state.entities.keys.filter((k)=>(
                
//                 state.entities[k].category_tags.some((e)=> Number.parseInt(e[0]) === Number.parseInt(catId))
//             )) 
//             let newState = {...filtState}
//             console.log(newState)

            

//         }
export default productSlice.reducer