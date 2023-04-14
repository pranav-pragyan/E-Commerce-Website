import React, { Fragment, useEffect, useState } from 'react'
import "./Products.css"
import {useDispatch,useSelector} from "react-redux"
import {getProduct} from "../../action/productAction"
import Loading from '../Loading/loading'
import Product from '../Home/Product'
import { useParams } from "react-router-dom";
// import  Pagination  from 'react-js-pagination';  // to do paginatio the webpage.
import { Slider,Typography } from '@material-ui/core'
import MetaData from "../Layout/metadata"

const categories= ["Laptop","Cloths", "Footware","Camera","Mobile"];

const Products = () => {

  const dispatch = useDispatch();
  const [currentPage,setCurrentPage] = useState(1);
  const [price,setPrice] = useState([0,200000])
  // const [category, setCategory] = useState("");

  const {loading,error,products,productsCount} = useSelector(state=>state.products);
  const { keyword } = useParams();

  const priceHandler = (event,newPrice) =>{
    setPrice(newPrice);
  }

  useEffect(()=>{
      dispatch(getProduct(keyword,currentPage,price));
  },[dispatch,keyword,currentPage,price]);
  
  

  const setCurrentPageNo = (e) =>{

    setCurrentPage(e)
  };
  return (
    <Fragment>
      <MetaData title="Products"/>
      {loading ? <Loading/> : <Fragment> 
        <MetaData title="Product Page"/>
        <h2 className='productHeading'>Products</h2>
        <div className="products">
          {}
          {products && products.map((element)=> <Product product={element}/> )}
        </div>


        {/* Filter Applying */}

        <div className="filterBox">
            <p className='pstyle'>FILTER</p>
            <Typography>Price</Typography>  {/* similar to p tag with some css applied */}

            <Slider
             value={price}
             onChange={priceHandler}
             valueLabelDisplay="auto"
             aria-labelledby='range-slider'
             min={0}
             max={200000}
            />

            {/* <Typography>Category</Typography>
            <ul className='categoryBox'>
                {categories.map((cat)=>(

                  <li className='category-link' key={cat} onClick={()=>setCategory(cat)}> {cat} </li>

                ))}
            </ul> */}

        </div>

        {/* <div className="paginationbar"> */}
          {/* <Pagination 
          activePage={currentPage} 
          itemsCountPerPage={8} 
          totalItemsCount={productsCount} 
          onChange={setCurrentPageNo} 
          nextPageText="Go Next" 
          prevPageText="Go Back" 
          firstPageText="1st" 
          lastPageText="Last" 
          itemClass='page-item' 
          linkClass='page-link'
          activeClass='pageItemActive'
          activeLinkClass='pageLinkActive'/> */}
          
        {/* </div> */}
        
      </Fragment>}
    </Fragment>
  )
}

export default Products



//    CATEGORY FILTER IS NOT WORKING...