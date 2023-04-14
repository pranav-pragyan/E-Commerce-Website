import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL,CLEAR_LOGIN_ERROR,
        REGISTRATION_REQUEST,REGISTRATION_SUCCESS,REGISTRATION_FAIL,
        LOAD_USER_REQUEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL, 
        LOGOUT_REQUEST,LOGOUT_SUCCESS,LOGOUT_FAIL,
        UPDATE_PROFILE_SUCCESS,UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_RESET,UPDATE_PROFILE_FAIL,
        ALL_USER_REQUEST,ALL_USER_SUCCESS,ALL_USER_FAIL,
        DELETE_USER_REQUEST,DELETE_USER_SUCCESS,DELETE_USER_FAIL,DELETE_USER_RESET,
        UPDATE_USER_REQUEST,UPDATE_USER_SUCCESS,UPDATE_USER_FAIL,UPDATE_USER_RESET,
        USER_DETAIL_REQUEST,USER_DETAIL_SUCCESS,USER_DETAIL_FAIL} from "../constants/userConstant"


export const userReducer = (state = { user : {}},action) =>{

  switch (action.type) {
    case LOGIN_REQUEST:
      
     return {
          loading : true,
          isAuthenticatedUser : false
     }; 

    case LOGIN_SUCCESS : 
     return {
       ...state,
        loading : false,
        isAuthenticatedUser : true,
        user : action.payload,
        token : action.token
     }

    
    case LOGIN_FAIL :
      return{
        ...state,
        loading : false,
        isAuthenticatedUser : false,
        user : null,
        error : action.payload,
        test : action.test
      }

    case CLEAR_LOGIN_ERROR:
    return {
      ...state,
      error : null, // error : null coz we want to clear all the error.
    };
  
    default:
      return state;
  }

}

// reducer for user registration...
export const userRegistrationReducer = (state = { user : {}},action) =>{

  switch (action.type) {
    case REGISTRATION_REQUEST:
      
     return {
          loading : true,
     }; 

    case REGISTRATION_SUCCESS : 

     return {
       ...state,
        loading : false,
        regUser : action.payload,
        message : action.message
     }

    
    case REGISTRATION_FAIL :
      return{
        ...state,
        loading : false,
        userUser : null,
        message : action.message,
        // test : action.test
      }

    case CLEAR_LOGIN_ERROR:
    return {
      ...state,
      error : null, // error : null coz we want to clear all the error.
    };
  
    default:
      return state;
  }

}


// load logged in user's detail
export const userLoadReducer = (state = { user : {}},action) =>{

  switch (action.type) {
      case LOAD_USER_REQUEST :
      
     return {
          loading : true,
          isAuthenticatedUser : false
     }; 
 
     case LOAD_USER_SUCCESS : 
     return {
       ...state,
        loading : false,
        isAuthenticatedUser : action.isAuthenticatedUser,
        user : action.user,
        token : action.token,
        test : action.test,
        name : action.name,
        role : action.role,
        email : action.email,
        joinOn : action.joinOn,
     }

    case LOAD_USER_FAIL :
      return {
        ...state,
        loading : false,
        isAuthenticatedUser : false,
        user : null,
        test : action.test
      }
  
    default:
      return state;
  }

}


//user logout reducer
export const userLogoutReducer = (state = { user : {}},action) =>{

  switch (action.type) {
      case LOGOUT_REQUEST :
      
     return {
          loading : true,
     }; 
 
     case LOGOUT_SUCCESS : 
     return {
       ...state,
        loading : false,
        message : action.payload.message,
        test : action.test,
     }

    case LOAD_USER_FAIL :
      return {
        ...state,
        loading : false,
        isAuthenticatedUser : false,
        user : null,
        test : action.test
      }
  
    default:
      return state;
  }

}


//update user profile
export const updateProfileReducer = (state = { },action) =>{

  switch (action.type) {
      case UPDATE_PROFILE_REQUEST :
      
     return {
          ...state,
          loading : true,
     }; 
 
     case UPDATE_PROFILE_SUCCESS : 
     return {
       ...state,
        loading : false,
        isUpdated : action.payload,
        test : action.test,
     }

    case UPDATE_PROFILE_FAIL :
      return {
        ...state,
        loading : false,
        error : action.payload,
      }

      case UPDATE_PROFILE_RESET : 

      return {
        ...state,
        isUpdated : false
      }
  
    default:
      return state;
  }

}

// Reducer for getting all the users details...
export const userReducerAdmin = (state = { users : []},action)=>
{  
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        loading : true,
        users : [],
      };

    case ALL_USER_SUCCESS :
      return{
        loading : false,
        users : action.payload,
      };

    case ALL_USER_FAIL:
    return {
      loading : false,
      error : action.payload,
    };

    default:
      return state;
  }
};


// Delete a user reducer
export const deleteUserReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case DELETE_USER_SUCCESS :
      return{
        ...state,
        loading : false,
        delSuccess : action.delSuccess,
        delMessage : action.delMessage,
      };

    case DELETE_USER_FAIL:
    return {
      ...state,
      loading : false,
      delError : action.delMessage,
    };

    case DELETE_USER_RESET:
      return{
          ...state,
          delSuccess : false
      }

    default:
      return state;
  }
};


// update a user reducer
export const updateUserReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case UPDATE_USER_SUCCESS :
      return{
        ...state,
        loading : false,
        isUpdated : action.isUpdated,
        updateMessage : action.updateMessage,
      };

    case UPDATE_USER_FAIL:
    return {
      ...state,
      loading : false,
      updateError : action.updateMessage,
    };

    case UPDATE_USER_RESET:
      return{
          ...state,
          isUpdated : false
      }

    default:
      return state;
  }
};


// get user detail reducer
export const getUserDetailReducerAdmin = (state = {},action)=>
{
  switch (action.type) {
    case USER_DETAIL_REQUEST:
      return {
        ...state,
        loading : true,
      };

    case USER_DETAIL_SUCCESS :
      return{
        ...state,
        loading : false,
        oldName : action.oldName,
        oldEmail : action.oldEmail,
        oldRole : action.oldRole,
        success : action.success,
      };

    case USER_DETAIL_FAIL:
    return {
      ...state,
      loading : false,
      success : action.success,
    };

    default:
      return state;
  }
};