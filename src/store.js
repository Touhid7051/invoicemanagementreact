import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducers,productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeletetReducer} from './reducers/userReducers'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer} from './reducers/orderReducers'
const reducer = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    userList:userListReducer,
    userDelete:userDeletetReducer,
    
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    orderListMy:orderListMyReducer,

})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []
    
const userInfoFromStorage = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null
    
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const intitialState = {
    cart:{ 
          cartItems: cartItemsFromStorage,
          shippingAddress: shippingAddressFromStorage,
        },
    userLogin:{userInfo: userInfoFromStorage},
}

const middleware = [thunk]

const store= createStore(reducer,intitialState, 
                         composeWithDevTools(applyMiddleware(...middleware)))

export default store