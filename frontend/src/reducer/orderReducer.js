import {ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,ALL_ORDER_FAIL,
        DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL,DELETE_ORDER_RESET,
        UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,UPDATE_ORDER_RESET,
        MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
        ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,ORDER_DETAIL_FAIL,
        CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,CLEAR_ERROR} from "../constants/orderConstant";


// Reducer for getting all the order details...
export const myOrdersReducer = (state = {orders:[]},action)=>
{  
  switch (action.type) {
    case MY_ORDER_REQUEST:
      return {
        loading : true,
      };

    case MY_ORDER_SUCCESS :
      return{
        loading : false,
        orders : action.myOrders,
        success : action.success
      };

    case MY_ORDER_FAIL:
    return {
      loading : false,
      error : action.success,
    };

    default:
      return state;
  }
};

// Reducer for getting detail of an order...
export const getOrdersDetailReducer = (state = {order :{}},action)=>
{  
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return{
        loading : true,
      };

    case ORDER_DETAIL_SUCCESS :
      return{
        loading : false,
        order : action.order,
        success : action.success,
      };

    case ORDER_DETAIL_FAIL:
    return {
      loading : false,
      error : action.success,
    };

    default:
      return state;
  }
};


// Reducer for getting all the order details...
export const orderReducerAdmin = (state = { orders : []},action)=>
{  
  switch (action.type) {
    case ALL_ORDER_REQUEST:
      return {
        loading : true,
        orders : [],
      };

    case ALL_ORDER_SUCCESS :
      return{
        loading : false,
        orders : action.orders,
        success : action.success,
        totalAmount : action.totalAmount,
      };

    case ALL_ORDER_FAIL:
    return {
      loading : false,
      error : action.success,
    };

    default:
      return state;
  }
};


// Delete a order reducer
export const deleteOrderReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case DELETE_ORDER_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case DELETE_ORDER_SUCCESS :
      return{
        ...state,
        loading : false,
        delSuccess : action.delSuccess,
        delMessage : action.delMessage,
      };

    case DELETE_ORDER_FAIL:
    return {
      ...state,
      loading : false,
      delError : action.delMessage,
    };

    case DELETE_ORDER_RESET:
      return{
          ...state,
          delSuccess : false
      }

    default:
      return state;
  }
};

// update a user reducer
export const updateOrderReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case UPDATE_ORDER_SUCCESS :
      return{
        ...state,
        loading : false,
        success : action.success,
        updateOrderMessage : action.updateOrderMessage,
      };

    case UPDATE_ORDER_FAIL:
    return {
      ...state,
      loading : false,
      updateOrderMessage : action.updateOrderMessage,
      orderError : action.success,
    };

    case UPDATE_ORDER_RESET:
      return{
          ...state,
          isUpdated : false
      }

    default:
      return state;
  }
};


// Reducer for creating order.
export const createOrderReducer = (state = {},action)=>
{  
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case CREATE_ORDER_SUCCESS :
      return{
        loading : false,
        order : action.order,
        success : action.success,
        // totalAmount : action.totalAmount,
      };

    case CREATE_ORDER_FAIL:
    return {
      loading : true,
      error : action.success,
    };

    case CLEAR_ERROR :
      return{
        ...state,
        error : null,
      }

    default:
      return state;
  }
};