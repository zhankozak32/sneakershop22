import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import apiReducer from "./reducers/apiReducer";
import authReducer from "./reducers/authReducer";
import productReducer from "./reducers/productReducer";
import brandReducer from "./reducers/brandReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import adminReducer from "./reducers/adminReducer";

export const store = createStore(combineReducers({
    api: apiReducer,
    auth: authReducer,
    product: productReducer,
    brand: brandReducer,
    admin: adminReducer
}), composeWithDevTools(applyMiddleware(thunk)))