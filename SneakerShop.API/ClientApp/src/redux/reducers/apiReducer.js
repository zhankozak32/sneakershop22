const SET_IS_FETCHING = 'SET_IS_FETCHING'

const initialState = {
    isFetching: false
}

export default function apiReducer(state = initialState, action){
    switch(action.type){
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload
            }
        default:
            return state
    }
}

export const setIsFetching = (fetching) => ({ type: SET_IS_FETCHING, payload: fetching })