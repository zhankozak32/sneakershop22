import {setIsFetching} from "../redux/reducers/apiReducer";
import axios from "axios";
import {setAuth} from "../redux/reducers/authReducer";
import {notification} from "antd";

export const login = user => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.post('auth/login',user)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            dispatch(setAuth(true))
        }catch(e){
            notification['error']({
                message: 'Error',
                description:
                    'Wrong email or password',
            });
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const logout = () => {
    return async dispatch => {
        localStorage.clear()
        dispatch(setAuth(false))
    }
}