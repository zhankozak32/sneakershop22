const SET_PRODUCTS = 'SET_PRODUCTS'

const initialState = {
    products: []
}

export default function productReducer(state = initialState, action){
    switch (action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

export const setProducts = (products) => ({type: SET_PRODUCTS, payload: products})