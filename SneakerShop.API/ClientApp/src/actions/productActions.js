import axios from "axios";
import {setProducts} from "../redux/reducers/productReducer";
import {setBrands} from "../redux/reducers/brandReducer";
import {setIsFetching} from "../redux/reducers/apiReducer";

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