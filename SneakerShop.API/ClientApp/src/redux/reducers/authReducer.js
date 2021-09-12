import jwtDecode from "jwt-decode";

const SET_AUTH = 'SET_AUTH'
const SET_USER_ORDERS = 'SET_USER_ORDERS'
const ADD_ORDER = 'ADD_ORDER'

const jwtToken = localStorage.getItem('token')

const initialState = {
    isAuth : !!jwtToken,
    orders: [],
    isAdmin: jwtToken ? jwtDecode(jwtToken).role === 'Admin' : false
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth,
                isAdmin: action.payload.isAdmin
            }
        case SET_USER_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case ADD_ORDER:
            return{
                ...state,
                orders: [...state.orders, action.payload]
            }
        default:
            return state
    }
}

export const setAuth = (auth) => ({type: SET_AUTH, payload: auth})
export const setUserOrders = (orders) => ({type: SET_USER_ORDERS, payload: orders})
export const addOrder = (order) => ({type: ADD_ORDER, payload: order})