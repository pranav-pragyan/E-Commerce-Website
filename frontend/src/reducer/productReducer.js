import {ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_CLEAR_ERROR,
        PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_FAIL,
        ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
        ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAIL,ADD_PRODUCT_RESET,
        DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_RESET,
        UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_RESET} from "../constants/productConstants";

export const productReducer = (state = { products : []},action)=>
{

  // there are three types of action which are above mentioned for product reducer.  
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
        return {
          loading : true,
          product : [],
        };

    case ALL_PRODUCT_SUCCESS:
      return {
        loading : false,
        products : action.payload.allProducts,
        productCount : action.payload.productCount
      };

    case ALL_PRODUCT_FAIL:
      return {
        loading : false,
        error : action.payload,
      };

    case ALL_CLEAR_ERROR:
    return {
      ...state,
      error : null, // error : null coz we want to clear all the error.
    };
    default:
      return state;
  }
};


export const productDetailReducer = (state = { product : {}},action)=>
{

  // there are three types of action which are above mentioned for product detail reducer.  
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
        return {
          loading : true,
          ...state
        };

    case PRODUCT_DETAIL_SUCCESS:
      return {
        loading : false,
        product : action.payload,
      };

    case PRODUCT_DETAIL_FAIL:
      return {
        loading : false,
        error : action.payload,
      };

    case ALL_CLEAR_ERROR:
    return {
      ...state,
      error : null, // error : null coz we want to clear all the error.
    };
    default:
      return state;
  }
};

export const productReducerAdmin = (state = { products : []},action)=>
{

  // there are three types of action which are above mentioned for product reducer.  
  switch (action.type) {
    case ADMIN_PRODUCT_REQUEST:
      return {
        loading : true,
        products : [],
      };

    case ADMIN_PRODUCT_SUCCESS :
      return{
        loading : false,
        products : action.payload,
      };

    case ADMIN_PRODUCT_FAIL:
    return {
      loading : false,
      error : action.payload,
    };

    default:
      return state;
  }
};

// add product reducer
export const addProductReducerAdmin = (state = {product:{}},action)=>
{
  switch (action.type) {
    case ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case ADD_PRODUCT_SUCCESS :
      return{
        loading : false,
        success : action.payload.success,
        product : action.payload.product,
      };

    case ADD_PRODUCT_FAIL:
    return {
      ...state,
      loading : false,
      error : action.payload,
    };

    case ADD_PRODUCT_RESET:
      return{
          ...state,
          success : false
      }

    default:
      return state;
  }
};

// Delete a product reducer
export const deleteProductReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case DELETE_PRODUCT_SUCCESS :
      return{
        ...state,
        loading : false,
        delSuccess : action.delSuccess,
        delMessage : action.delMessage,
      };

    case DELETE_PRODUCT_FAIL:
    return {
      ...state,
      loading : false,
      delError : action.delMessage,
    };

    case DELETE_PRODUCT_RESET:
      return{
          ...state,
          delSuccess : false
      }

    default:
      return state;
  }
};

// Delete a product reducer
export const updateProductReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case UPDATE_PRODUCT_SUCCESS :
      return{
        ...state,
        loading : false,
        isUpdated : action.isUpdated,
        updateMessage : action.updateMessage,
      };

    case UPDATE_PRODUCT_FAIL:
    return {
      ...state,
      loading : false,
      updateError : action.updateMessage,
    };

    case UPDATE_PRODUCT_RESET:
      return{
          ...state,
          isUpdated : false
      }

    default:
      return state;
  }
};