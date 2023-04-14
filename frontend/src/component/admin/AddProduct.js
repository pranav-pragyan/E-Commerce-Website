import React,{Fragment, useEffect,useState} from 'react'
import "./AddProduct.css";
import Loading from '../Loading/loading';
import {useDispatch,useSelector} from "react-redux";
import {addProduct} from "../../action/productAction"
import Sidebar from './sidebar.js';
import { Button } from '@mui/material';
import MetaData from "../Layout/metadata";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ImageIcon from '@mui/icons-material/Image';
import {ADD_PRODUCT_RESET} from "../../constants/productConstants"
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error,product,success} = useSelector(state=>state.addProduct);

  const [name, setName] = useState("");
  const [price,setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [description,setDescription] = useState("");
  const [category,setCategory] = useState();
  const [img_url, setImg_url] = useState([]);
  
  const categories = ["Cloth", "Mobile", "Laptop","Shoe", "Watch"];

  const productDetail ={name,price, quantity, description, category, image : [{public_id : "just for test id", img_url}]}


  useEffect(()=>{
    if(error)
    {
      alert(error);
    }
    
    if(success)
    {
      alert("Product Added Successfully");
      navigate("/admin/dashboard");
      dispatch({type : ADD_PRODUCT_RESET});
    }
  },[dispatch,error,navigate,success]);

  const addProductSubmitHandler = (e) =>{
      e.preventDefault();
      dispatch(addProduct(productDetail));
  };
  return (
    <Fragment>
      {/* {loading ? <MetaData title={"Add New Product"}/>: */}
        <Fragment>
        <MetaData title={"Add New Product"}/>
        <div className="dashboard">
          <Sidebar/>
          <div className="addProductContainer">
            <form className='addProductForm' encType='multipart/form-data' onSubmit={addProductSubmitHandler} >
                <h1 id='addProductHeading'>Add Product</h1>
                <div>
                  <SpellcheckIcon/>
                  <input type="text" placeholder='Product Name' required value={name} onChange={(e)=>setName(e.target.value)} />
                </div>
                <div>
                  <AttachMoneyIcon/>
                  <input type="number" placeholder='Price' required value={price} onChange={(e)=>setPrice(e.target.value)} />
                </div>
                <div>
                  <DescriptionIcon/>
                  <textarea placeholder='Product Description' value={description} onChange={(e)=>setDescription(e.target.value)} cols="30" rows="1" required ></textarea>
                </div>
                <div>
                  <AccountTreeIcon/>
                  <select onChange={(e)=>setCategory(e.target.value)} >
                    <option>Choose Category</option>
                    {categories && categories.map((cat)=>(
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <StorageIcon/>
                  <input type="number" placeholder='Quantity' required value={quantity} onChange={(e)=>setQuantity(e.target.value)} />
                </div>
                <div>
                  <ImageIcon/>
                  <input type="text" placeholder='Image url' required value={img_url} onChange={(e)=>setImg_url(e.target.value)} />
                </div>
                <Button id="addProductBtn" type='submit' disabled={loading ? true : false} > ADD PRODUCT</Button>
            </form>
          </div>
        </div>
      </Fragment>
    {/* } */}
    </Fragment>
  )
}

export default AddProduct