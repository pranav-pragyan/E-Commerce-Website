import axios from "axios";
import {ALL_ORDER_REQUEST,ALL_ORDER_SUCCESS,ALL_ORDER_FAIL,
        DELETE_ORDER_REQUEST,DELETE_ORDER_SUCCESS,DELETE_ORDER_FAIL,
        UPDATE_ORDER_REQUEST,UPDATE_ORDER_SUCCESS,UPDATE_ORDER_FAIL,
        MY_ORDER_REQUEST,MY_ORDER_SUCCESS,MY_ORDER_FAIL,
        ORDER_DETAIL_REQUEST,ORDER_DETAIL_SUCCESS,ORDER_DETAIL_FAIL,
        CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL, CLEAR_ERROR} from "../constants/orderConstant";

// Get All Orders of A Logged In User...
export const myOrderDetails = () => async(dispatch) =>
{
    
      dispatch({type : MY_ORDER_REQUEST,}); 

      const link= "/api/orders/detail";

      const {data} = await axios.get(link);

      if(data.success)
      {
        dispatch({ type : MY_ORDER_SUCCESS, success:data.success , myOrders : data.orders});
  
      }
      else
      {
        dispatch({ type : MY_ORDER_FAIL, success:data.success }); 
      }
      
};

// Get detail of an order...
export const getOrderDetail = (id) => async(dispatch) =>
{
    
      dispatch({type : ORDER_DETAIL_REQUEST,}); 

      const link= `/api/order/${id}`;

      const {data} = await axios.get(link);

      if(data.success)
      {
        dispatch({ type : ORDER_DETAIL_SUCCESS, success:data.success , order : data.order});
        localStorage.setItem("orderDetail",JSON.stringify(data));
  
      }
      else
      {
        dispatch({ type : ORDER_DETAIL_FAIL, success:data.success }); 
      }
      
};


// Get All Orders From Backend by Admin...
export const getAllOrderDetails = () => async(dispatch) =>
{
    
      dispatch({type : ALL_ORDER_REQUEST,}); 

      const link= "/api/admin/orders";

      const {data} = await axios.get(link);

      // alert(data.products.length);

      if(data.success)
      {
        dispatch({ type : ALL_ORDER_SUCCESS, success:data.success ,totalAmount : data.totalAmount, orders : data.orders});
  
      }
      else
      {
        dispatch({ type : ALL_ORDER_FAIL, success:data.success }); 
      }
      
};

// Delete A Order (By Admin)...
export const deleteORDER = (orderID) => async(dispatch) =>
{
   
    dispatch({type :DELETE_ORDER_REQUEST,}); 

    // // config is required while making a post request...
    // const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.delete(`/api/admin/order/delete/${orderID}`);

    if(data.success)
    {
      dispatch({type : DELETE_ORDER_SUCCESS,delMessage : data.message, delSuccess : data.success});
    }
    else
    {
      dispatch({type : DELETE_ORDER_FAIL,delMessage : data.message});  
    }    
};

// Update A Order (By Admin)...
export const updateORDER = (orderID,status) => async(dispatch) =>
{
   
    dispatch({type :UPDATE_ORDER_REQUEST,}); 

    // // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.put(`/api/admin/order/update/${orderID}`,status,config);

    if(data.success)
    {
      alert()
      dispatch({type : UPDATE_ORDER_SUCCESS,updateOrderMessage : data.message, success : data.success});
    }
    else
    {
      dispatch({type : UPDATE_ORDER_FAIL,success : data.success,updateOrderMessage : data.message,});  
    }    
};


// Create an  order...
export const createNewOrder = (details) => async(dispatch) =>
{
    
      dispatch({type : CREATE_ORDER_REQUEST,}); 

      const config = {headers : {"Content-Type" : "application/json"}};
      const link= "/api/order/new";
      const {data} = await axios.post(link,details,config);

      if(data.success)
      {
        dispatch({ type : CREATE_ORDER_SUCCESS, success:data.success , order: data.orderDetail, message:data.message});
  
      }
      else
      {
        dispatch({ type : CREATE_ORDER_FAIL, success:data.success }); 
      }
      
};

// clear all error
export const clearErrors = ()=>async(dispatch)=>{
    dispatch({type : CLEAR_ERROR});
}