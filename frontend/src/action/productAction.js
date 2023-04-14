import axios from "axios";
import {ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, ALL_CLEAR_ERROR,
        PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_REQUEST,PRODUCT_DETAIL_FAIL,
        ADMIN_PRODUCT_REQUEST,ADMIN_PRODUCT_SUCCESS,ADMIN_PRODUCT_FAIL,
        ADD_PRODUCT_REQUEST,ADD_PRODUCT_SUCCESS,ADD_PRODUCT_FAIL,ADD_PRODUCT_RESET,
        DELETE_PRODUCT_REQUEST,DELETE_PRODUCT_SUCCESS,DELETE_PRODUCT_FAIL,DELETE_PRODUCT_RESET,
        UPDATE_PRODUCT_REQUEST,UPDATE_PRODUCT_SUCCESS,UPDATE_PRODUCT_FAIL,UPDATE_PRODUCT_RESET} from "../constants/productConstants";

// Get Product From Backend...
export const getProduct = (keyword="",currentPage=1,price=[0,200000],category) => async(dispatch) =>
{
    try 
    {
      dispatch({
        type : ALL_PRODUCT_REQUEST,
      }); 

      
      const link= `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

      // if(category)
      // {
      //       link = `/api/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}`;
      // }


       // getting product data from backend...
      const {data} = await axios.get(link);
      
      dispatch({
        type : ALL_PRODUCT_SUCCESS,
        payload : data
      });

      // console.log(data);
    } 
    catch (error) 
    {
        dispatch({
          type : ALL_PRODUCT_FAIL,
          payload : error.response.data.message,
        });  
    }
};

// Get Product From Backend by Admin...
export const getProductAdmin = () => async(dispatch) =>
{
    
      dispatch({
        type : ADMIN_PRODUCT_REQUEST,
      }); 

      
      const link= "/api/admin/products";

       // getting product data from backend...
      const {data} = await axios.get(link);

      // alert(data.products.length);

      if(data.products.length)
      {
        dispatch({ type : ADMIN_PRODUCT_SUCCESS, payload : data.products,});
  
      }
      else
      {
        dispatch({ type : ADMIN_PRODUCT_FAIL, payload : "data could not be fetched due to some reasons"}); 
      }
      
};

// Get A Product Detail From Backend...
export const getProductDetail = (id) => async(dispatch) =>
{
    try 
    {
      dispatch({
        type : PRODUCT_DETAIL_REQUEST,
      }); 

      // getting product data from backend...
      const {data} = await axios.get(`/api/products/${id}`);
      
      dispatch({
        type : PRODUCT_DETAIL_SUCCESS,
        payload : data.product
      });

      // console.log(data);
    } 
    catch (error) 
    {
        dispatch({
          type : PRODUCT_DETAIL_FAIL,
          payload : error.response.data.message,
        });  
    }
};

// Add A Product (By Admin)...
export const addProduct = (productDetail) => async(dispatch) =>
{
   
    dispatch({type : ADD_PRODUCT_REQUEST,}); 

    // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    // getting product data from backend...
    const {data} = await axios.post("/api/admin/products/addProduct",productDetail,config);

    if(data.success)
    {
      dispatch({type : ADD_PRODUCT_SUCCESS,payload : data});
    }
    else
    {
      dispatch({type : ADD_PRODUCT_FAIL,payload :"Product couldn't be added"});  
    }    
};

// Delete A Product (By Admin)...
export const deleteProduct = (productID) => async(dispatch) =>
{
   
    dispatch({type :DELETE_PRODUCT_REQUEST,}); 

    // // config is required while making a post request...
    // const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.delete(`/api/admin/products/${productID}`);

    if(data.success)
    {
      dispatch({type : DELETE_PRODUCT_SUCCESS,delMessage : data.message, delSuccess : data.success});
    }
    else
    {
      dispatch({type : DELETE_PRODUCT_FAIL,delMessage : data.message});  
    }    
};

// Update A Product (By Admin)...
export const updateProduct = (productID,productData) => async(dispatch) =>
{
   
    dispatch({type :UPDATE_PRODUCT_REQUEST,}); 

    // // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.put(`/api/admin/products/${productID}`,productData,config);

    if(data.success)
    {
      dispatch({type : UPDATE_PRODUCT_SUCCESS,updateMessage : data.message, isUpdated : data.success});
    }
    else
    {
      dispatch({type : UPDATE_PRODUCT_FAIL,updateMessage : data.message});  
    }    
};


export const clearAllError = () => async(dispatch) =>
{
  dispatch({
    type : ALL_CLEAR_ERROR,
  });
}


//    CATEGORY FILTER IS NOT WORKING...


