const SET_ORDERS = 'SET_ORDERS'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'

const initialState = {
    orders: [],
    currentPage: 1,
    pageSize: 10,
    pagesCount: 0
}

export default function adminReducer(state = initialState, action){
    switch(action.type){
        case SET_ORDERS:
            return {
                ...state,
                orders: action.payload.data,
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

export const setOrders = (data) => ({type: SET_ORDERS, payload: data})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: currentPage})