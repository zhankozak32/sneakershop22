import axios from "axios";
import {setProducts} from "../redux/reducers/productReducer";
import {setBrands} from "../redux/reducers/brandReducer";
import {setIsFetching} from "../redux/reducers/apiReducer";
import {addOrder} from "../redux/reducers/authReducer";
import {setOrders} from "../redux/reducers/adminReducer";
import {notification} from "antd";

export const postProduct = (product) => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.post('product', product)
            notification['success']({
                message: 'Success',
                description: 'Product added'
            })
        }catch (e){
            console.log(e)
            notification['error']({
                message: 'Error',
                description: 'Server error'
            })
        }finally {
            dispatch(setIsFetching(false))
        }


    }
}

export const getProducts = () => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get('product')
            console.log(response)
            dispatch(setProducts(response.data))
        }catch (e){
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const getBrands = () => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get('brand')
            console.log(response)
            dispatch(setBrands(response.data))
        }catch (e){
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const getProductByBrandName = (brandName) => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get(`product/brand?brandName=${brandName}`)
            dispatch(setProducts(response.data))
        }catch (e){
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const placeOrder = product => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const order = {
                productId: product.id,
                selectedSize: product.selectedSize
            }
            const response = await axios.post('order', order)
            dispatch(addOrder(response.data))
        }catch (e){
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const getPagedProducts = (pageNumber, pageSize = 10) => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get(`product/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            dispatch(setProducts(response.data))
        }catch (e) {
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const getPagedOrders = (pageNumber, pageSize = 2) => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.get(`order/paginated?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            dispatch(setOrders(response.data))
        }catch (e){
            console.log(e)
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}

export const processOrder = (orderId) => {
    return async (dispatch) => {
        try{
            dispatch(setIsFetching(true))
            const response = await axios.put(`order?orderId=${orderId}`)
            notification['success']({
                message: 'Success',
                description: 'Order processed'
            })

        }catch (e){
            console.log(e)
            notification['error']({
                message: 'Error',
                description: 'Server error'
            })
        }finally {
            dispatch(setIsFetching(false))
        }
    }
}