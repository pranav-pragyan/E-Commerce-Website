import React, { Fragment, useEffect } from 'react'
import MouseOutlinedIcon from '@material-ui/icons/MouseOutlined';
import "./home.css"
import Product from "./Product"
// import logo from '../../../src/image/Enigmaticomm-logos_black.png';
import MetaData from '../Layout/metadata'; 
import { getProduct } from '../../action/productAction';
import {useSelector,useDispatch} from "react-redux"; // to work with redux function we require this.
import Loading from '../Loading/loading';
import Button from '@mui/material/Button';

// A temparory static product detail to show on web page statically
// const product = {
//   name : "kala kar",
//   images : [{url :logo}],
//   price : "₹50000",
//   _id : "aalu",
// }


const Home = () => {

  const dispatch = useDispatch();
  const {loading,error,products,productsCount} = useSelector(state=>state.products);

  useEffect( () =>{
    dispatch(getProduct()); 
  },[dispatch]);

  return (

    <>
    {loading ? <Loading/> :
      <Fragment>
        <MetaData title="Home Page"/>
        <div className="topBigImage">
          <p>Welcome To Enigmaticomm</p>
          <h1>Find The Product Below</h1>
          <a href="#homeHeading">
            <button>
              Scroll <MouseOutlinedIcon/>
            </button>
          </a>
        </div>
        <h2 className='homeHeading' id="homeHeading"> Featured Products </h2>
        <div className="container" id='container'>
        
          {/* showing products that come from database.*/}
          {products && products.map((product)=> <Product product={product}/> )}

        </div>
        <div className='nextPageButton'>
            <Button ><a href="/products">Next</a></Button>
        </div>
  
      </Fragment>}
    </>
  )
}

export default Home