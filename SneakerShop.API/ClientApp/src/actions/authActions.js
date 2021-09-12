import {setIsFetching} from "../redux/reducers/apiReducer";
import axios from "axios";
import {setAuth, setUserOrders} from "../redux/reducers/authReducer";
import {notification} from "antd";
import jwtDecode from "jwt-decode";

export const register = user => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.post('auth/register', user)
            notification['success']({
                message: 'Success',
                description: 'Registered successfully'
            })
        }catch(e){
            notification['error']({
                message: 'Error',
                description: 'Server error'
            })
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const login = user => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.post('auth/login',user)
            console.log(response)
            localStorage.setItem('token', response.data.token)
            dispatch(setAuth({
                isAuth: true,
                isAdmin: jwtDecode(response.data.token).role === 'Admin'
            }))
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

export const getUserOrders = () => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get('order')
            console.log(response.data)
            dispatch(setUserOrders(response.data))
        }catch (e){
            console.log(e)
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