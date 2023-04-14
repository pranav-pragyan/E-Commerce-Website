import React from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'
import "./home.css"

const options ={
  edit : false,
  color : "rgba(20,20,20,0.1)",
  activeColor : "gold",
  size : window.innerWidth < 600 ? 20 : 25,
  value : 2.5,
  isHalf : true
} 
const Product = ({product}) => {

  options.value = product.ratings;
  return (
    <Link className='productCard' to={`/product/${product._id}`}>
        <img src={product.image[0].img_url} alt={product.name} />
        <p>{product.name}</p> 
        <div>
          <ReactStars {...options}/>
          <span>{`${product.noOfReviews} Reviews`}</span>
        </div>
        <span>{`₹${product.price}`}</span>

    </Link>
  )
}

export default Product