const SET_PRODUCTS = 'SET_PRODUCTS'
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"

const initialState = {
    products: [],
    currentPage: 1,
    pageSize: 10,
    pagesCount: 0
}

export default function productReducer(state = initialState, action){
    switch (action.type){
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload.data,
                pagesCount: action.payload.pageViewModel.totalPages
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload
            }
        default:
            return state
    }
}

export const setProducts = (data) => ({type: SET_PRODUCTS, payload: data})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: currentPage})