const SET_BRANDS = 'SET_BRANDS'

const initialState = {
    brands: []
}

export default function brandReducer(state = initialState, action){
    switch (action.type){
        case SET_BRANDS:
            return {
                ...state,
                brands: action.payload
            }
        default:
            return state
    }
}

export const setBrands = (brands) => ({type: SET_BRANDS, payload: brands})