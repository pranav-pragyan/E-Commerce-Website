// to manage the state, we are going to use redux
import {createStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { productDetailReducer, productReducer, productReducerAdmin,addProductReducerAdmin,deleteProductReducerAdmin,updateProductReducerAdmin } from "./reducer/productReducer";
import { userReducer, userRegistrationReducer,userLoadReducer,userLogoutReducer,updateProfileReducer, userReducerAdmin,deleteUserReducerAdmin,updateUserReducerAdmin,getUserDetailReducerAdmin} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import { orderReducerAdmin,deleteOrderReducerAdmin, myOrdersReducer,getOrdersDetailReducer,createOrderReducer,updateOrderReducerAdmin } from "./reducer/orderReducer";


const reducer = combineReducers({
  products : productReducer,
  productDetail : productDetailReducer,
  user : userReducer,
  userReg : userRegistrationReducer,
  userLoad : userLoadReducer,
  userLogout : userLogoutReducer,
  profile : updateProfileReducer,
  cart : cartReducer,
  productsAdmin : productReducerAdmin,
  addProduct : addProductReducerAdmin,
  deleteProduct : deleteProductReducerAdmin,
  updateProduct : updateProductReducerAdmin,
  usersDetail : userReducerAdmin,
  deleteUser : deleteUserReducerAdmin,
  updateUser : updateUserReducerAdmin,
  userDetail : getUserDetailReducerAdmin,
  allOrders : orderReducerAdmin,
  deleteOrder : deleteOrderReducerAdmin,
  myOrder : myOrdersReducer,
  orderDetail : getOrdersDetailReducer,
  newOrder : createOrderReducer,
  updateOrder : updateOrderReducerAdmin,
});

// JSON parse is used to convert json string into json object
let initialState = {
  cart : {
    cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo : localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")) : {},
    
  }
};
const middleware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)));


export default store;