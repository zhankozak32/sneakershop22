const SET_AUTH = 'SET_AUTH'

const initialState = {
    isAuth : localStorage.getItem('token') ? true : false,
    isAdmin: false
}

export default function authReducer(state = initialState, action){
    switch(action.type){
        case SET_AUTH:
            return {
                ...state,
                isAuth: action.payload
            }
        default:
            return state
    }
}

export const setAuth = (auth) => ({type: SET_AUTH, payload: auth})