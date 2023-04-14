import React, {useState,useEffect, Fragment} from 'react'
import "./profileUpdate.css"
import Loading from '../Loading/loading'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux"
import { loadUser, updateProfile } from '../../action/userAction';
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';

const UpdateProfile = () => {

  const dispatch = useDispatch();
  // const alert = useAlert();
  const navigate = useNavigate();

  const { user } = useSelector(state=>state.user);
  const { error,isUpdated, loading} = useSelector(state=>state.profile)

  const [name,setName] = useState("");
  const [email,setEmail] = useState(""); 

  const updateProfileSubmit = (e) =>{
    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("name",name);
    // myForm.set("email",email);
    dispatch(updateProfile(name,email));
  };  

  useEffect(()=>{

    if(user)
    {
      setName(user.name);
      setEmail(user.email);
    }
    if(error){
      alert(error);
    }

    if(isUpdated)
    {
      alert("Profile Updated Successfully");
      dispatch(loadUser());
      navigate("/me");

      dispatch({
        type : UPDATE_PROFILE_RESET,
      })
    }
  },[dispatch,error,alert,navigate,user,isUpdated])


  return (

    <>
      {loading ? <Loading/> :
        <Fragment>

          <div className="profileUpdateContainer">
            <div className="profileBox">
              <h2>Update Profile</h2>
            <form className='updateProfileForm' onSubmit={updateProfileSubmit} encType="multipart/form-data">
              <div className="updateProfileName">
                  <AccountCircleIcon/>
                  <input type="text" placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="updateProfileEmail">
                <EmailIcon/>
                <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>

              <input type="submit" value="Update" className="updateProfileButton" /> 
              </form>
            </div>
          </div>
        </Fragment>
      }
    </>

)
}

export default UpdateProfile