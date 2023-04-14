import React,{useEffect} from 'react'
import Metadata from '../Layout/metadata'
import {useDispatch,useSelector} from "react-redux"
import user_icon from '../../../src/image/user_icon.png'
import {Link,useNavigate} from "react-router-dom"
import "./profile.css";


const Profile = () => {

  const navigate = useNavigate();  // to get data from link
  const {name,isAuthenticatedUser,email,joinOn} = useSelector(state=>state.userLoad)

  
  if(isAuthenticatedUser===false)
      navigate("/login");

  return (
    <>
      <Metadata title={name}/>
      <div className="profileContainer">
        <div className='ProfileheaderContainer'>
          <h1 className='Profileheader'>My Profile</h1>
          <img src={user_icon} alt="name" />
          <Link to="/me/update">Edit Profile</Link>
        </div>
        <div>
          <div>
              <h4>Full Name</h4>
              <p>{name}</p>
          </div>

          <div>
              <h4>Email</h4>
              <p>{email}</p>
          </div>

          <div>
              <h4>Join On</h4>
              <p>{joinOn.substring(0, 10)}</p>
          </div>

          <div className='linkDiv'>
              <Link to="/orders" >My Order</Link>
              <Link to="/password/update" >Change Password</Link>
          </div>

        </div>
      </div>
    </>
  )
}

export default Profile