import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import apiReducer from "./reducers/apiReducer";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import brandReducer from "./reducers/brandReducer";

export const store = createStore(combineReducers({
    api: apiReducer,
    auth: authReducer,
    product: productReducer,
    brand: brandReducer
}), applyMiddleware(thunk))