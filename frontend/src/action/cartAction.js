import {ADD_TO_CART, REMOVE_CART_ITEM,SAVE_SHIPPING_INFO} from "../constants/cartConstant";
import axios from "axios"; 


// Add To Cart
export const addItemsToCart = (id ,quantity) => async (dispatch,getState) =>
{


  const {data} = await axios.get(`/api/products/${id}`);

  // alert( data.product._id);

  dispatch({
    type : ADD_TO_CART,
    payload : {
      product_id : data.product._id,
      name : data.product.name,
      price : data.product.price,
      image : data.product.image[0].img_url,
      quantityFromDB : data.product.quantity,
      quantity
    }
  })

  // keep the Add TO Cart data in the local storage. So that the data will not vanished from the page after refresh.
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// Remove from Cart
export const removeFromCart = (id) => async (dispatch,getState) =>
{

  dispatch({
    type : REMOVE_CART_ITEM,
    payload : id,
  })

  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
}

// Save Shipping Ingo
export const saveShippingInfo = (shippingData) => async (dispatch,getState) =>
{
  dispatch({
    type : SAVE_SHIPPING_INFO,
    payload : shippingData,
  })
  localStorage.setItem("shippingInfo",JSON.stringify(shippingData));
}
