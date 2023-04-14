import React,{Fragment, useEffect,useState} from 'react'
import "./AddProduct.css";
import Loading from '../Loading/loading';
import {useDispatch,useSelector} from "react-redux";
// import {updateProduct,getProductDetail} from "../../action/productAction"
import {getUSERDetail, updateUSER} from "../../action/userAction"
import Sidebar from './sidebar.js';
import { Button } from '@mui/material';
import MetaData from "../Layout/metadata";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate,useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstant';

const UpdateProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const {loading,updateError,isUpdated} = useSelector(state=>state.updateUser);
  const {oldName,oldEmail,oldRole} = useSelector(state=>state.userDetail);

  const [name, setName] = useState();
  const [email,setEmail] = useState();
  const [role, setRole] = useState();

  const roles = ["admin","user"];

  const userDetails ={name,email,role}


  useEffect(()=>{  
      dispatch(getUSERDetail(id));
      
      setName(oldName);
      setEmail(oldEmail);
      setRole(oldRole);
    
    
    if(updateError)
    {
      alert(updateError);
    }

    if(isUpdated)
    {
      alert("User Updated Successfully");
      navigate("/admin/users");
      dispatch({type : UPDATE_USER_RESET});
    }
  },[dispatch,updateError,navigate,isUpdated]);

  const updateUserSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(updateUSER(id,userDetails));
  };
  return (
    <Fragment>
        <Fragment>
        <MetaData title={"Update User"}/>
        <div className="dashboard">
          <Sidebar/>
          <div className="addProductContainer">
            <form className='addProductForm' encType='multipart/form-data' onSubmit={updateUserSubmitHandler} >
                <h1 id='addProductHeading'>Update User</h1>
                <div>
                  <PersonIcon/>
                  <input type="text" placeholder='User Name' required value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                  <EmailIcon/>
                  <input type="text" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div>
                  <AccountTreeIcon/>
                  <select value={role} onChange={(e)=>setRole(e.target.value)} >
                    <option>Select Role</option>
                    {roles && roles.map((cat)=>(
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <Button id="addProductBtn" type='submit' disabled={loading ? true : false} > UPDATE USER</Button>
            </form>
          </div>
        </div>
      </Fragment>
    </Fragment>
  )
}

export default UpdateProduct;