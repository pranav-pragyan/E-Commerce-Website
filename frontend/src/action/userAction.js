import axios from "axios"
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_LOGIN_ERROR, 
        REGISTRATION_REQUEST,REGISTRATION_SUCCESS,REGISTRATION_FAIL,
        LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
        LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,
        UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,UPDATE_PROFILE_FAIL,
        ALL_USER_REQUEST,ALL_USER_SUCCESS,ALL_USER_FAIL,
        DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAIL,
        UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAIL,
        USER_DETAIL_REQUEST,USER_DETAIL_SUCCESS,USER_DETAIL_FAIL} from "../constants/userConstant"


export const login = (email ,password) => async (dispatch) =>{


    dispatch({type : LOGIN_REQUEST});

    // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.post("/api/login", {email, password}, config);


    if(data.user)
    {
      dispatch({ type : LOGIN_SUCCESS, payload : data.user,token : data.token, test:0});
      localStorage.setItem("User Token",data.token);
    }
    else
     dispatch({type : LOGIN_FAIL, paylaod : "invalid user", test:1}) 


}


export const clearError  = () => async (dispatch) =>
{
  dispatch({type : CLEAR_LOGIN_ERROR})
}


// user registration action...
export const registration = (name,email ,password) => async (dispatch) =>
{


  dispatch({type : REGISTRATION_REQUEST});

    // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.post("/api/login", {email, password}, config);

  if(data.user)
  {
    dispatch({ type : REGISTRATION_FAIL, message : "Already an accont exist with this mail id",paylaod : "Already an accont exist with this mail id", test:0});
    alert(JSON.stringify(data));
  } else if(name)
  {
      const {data1} = await axios.post("/api/register", {name, email, password}, config);

      dispatch({ type : REGISTRATION_SUCCESS, payload : data1.user,message : "Registration Successful"});
      if(data1.user)
      {
        dispatch({ type : REGISTRATION_SUCCESS, payload : data1.user,message : "Registration Successful"});
      }
        
      else
        dispatch({type : REGISTRATION_FAIL, message : "Registration Failed",paylaod : "Registration Failed"});
  }
    
}


// Load User
export const loadUser = () => async (dispatch) =>{


  dispatch({type : LOAD_USER_REQUEST});


  const {data} = await axios.get("/api/me");

  if(data.user)
    dispatch({ type : LOAD_USER_SUCCESS, test:0, name : data.user.name,role : data.user.role, isAuthenticatedUser:true,email:data.user.email,joinOn:data.user.createAt,user:data.user});
  else
   dispatch({type : LOAD_USER_FAIL, paylaod : "invalid user", test:1,isAuthenticatedUser:false}) 


}


// user Logout
export const logout = () => async (dispatch) =>{


  dispatch({type : LOGOUT_REQUEST});


  const {data} = await axios.get("/api/logout");

  if(data)
  {
    dispatch({ type : LOGOUT_SUCCESS, payload : data, test:0});
    localStorage.removeItem("User Token");
  }
  else
   dispatch({type : LOGOUT_FAIL, test:1})  

}


// update user profile
export const updateProfile = (name,email) => async (dispatch) =>
{
  dispatch({type : UPDATE_PROFILE_REQUEST});

  // config is required while making a post request...
  const config = {headers : {"Content-Type" : "application/json"}};

  const {data} = await axios.put("/api/me/update", {name,email}, config);

  // const config = { headers : { "Content-Type":"multipart/form-data"}};

  // const {data} = await axios.put(`/api/me/update`,userData,config);

  if(data.user)
  {
    dispatch({type : UPDATE_PROFILE_SUCCESS,paylaod : "Updation done",test:1})
    alert(data.message);
    // alert(JSON.stringify(data.user))
    
  }
  else
  {
    dispatch({type : UPDATE_PROFILE_FAIL, paylaod : "Updation Failed" })
  }
}

// Get All User From Backend by Admin...
export const allUsersDetails = () => async(dispatch) =>
{
    
      dispatch({type : ALL_USER_REQUEST,}); 

      
      const link= "/api/admin/allUsers";

       // getting product data from backend...
      const {data} = await axios.get(link);

      // alert(data.products.length);

      if(data.users.length)
      {
        dispatch({ type : ALL_USER_SUCCESS, payload : data.users,});
  
      }
      else
      {
        dispatch({ type : ALL_USER_FAIL, payload : "data could not be fetched due to some reasons"}); 
      }
      
};


// Delete A User (By Admin)...
export const deleteUSER = (userID) => async(dispatch) =>
{
   
    dispatch({type :DELETE_USER_REQUEST,}); 

    // // config is required while making a post request...
    // const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.delete(`/api/admin/user/${userID}`);

    if(data.success)
    {
      dispatch({type : DELETE_USER_SUCCESS,delMessage : data.message, delSuccess : data.success});
    }
    else
    {
      dispatch({type : DELETE_USER_FAIL,delMessage : data.message});  
    }    
};


// Update A User (By Admin)...
export const updateUSER = (userID,userData) => async(dispatch) =>
{
   
    dispatch({type :UPDATE_USER_REQUEST,}); 

    // // config is required while making a post request...
    const config = {headers : {"Content-Type" : "application/json"}};

    const {data} = await axios.put(`/api/admin/user/${userID}`,userData,config);

    if(data.success)
    {
      dispatch({type : UPDATE_USER_SUCCESS,updateMessage : data.message, isUpdated : data.success});
    }
    else
    {
      dispatch({type : UPDATE_USER_FAIL,updateMessage : data.message});  
    }    
};

// get A User Detail (By Admin)...
export const getUSERDetail = (userID) => async(dispatch) =>
{
   
    dispatch({type :USER_DETAIL_REQUEST,}); 


    const {data} = await axios.get(`/api/user/${userID}`);

    if(data.success)
    {
      dispatch({type : USER_DETAIL_SUCCESS, success : data.success, oldName:data.user.name,oldEmail:data.user.email,oldRole:data.user.role});
    }
    else
    {
      dispatch({type : USER_DETAIL_FAIL,uccess : data.success});  
    }    
};
