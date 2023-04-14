import React, { Fragment, useEffect, useState} from 'react'
import Carousel from 'react-material-ui-carousel';
import "./productDetail.css";
import {useDispatch,useSelector} from "react-redux";
import { getProductDetail } from '../../action/productAction';
import { useParams } from "react-router-dom";
import ReactStars from 'react-rating-stars-component'
import Loading from "../Loading/loading"
import {addItemsToCart} from "../../action/cartAction"

const ProductDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();

  const {product,loading,error} = useSelector((state)=>state.productDetail)
  // match.params.id for frontend is similar request.params.id in backend
  useEffect(()=>{

      dispatch(getProductDetail(id));
  },[dispatch,id]);

  const options ={
    edit : false,
    color : "rgba(20,20,20,0.1)",
    activeColor : "gold",
    size : window.innerWidth < 600 ? 20 : 25,
    value : product.ratings,
    isHalf : true
  } 

  const [quantity,setQuantity] = useState(1);

  const increaseQuantity = () =>
  {
    if(product.quantity <= quantity) return ;
    const qnt = quantity + 1;
    setQuantity(qnt);   
  }

  const decreaseQuantity = () =>
  {
    if(quantity<=1) return ;
    const qnt = quantity - 1;
    setQuantity(qnt);
  }

  const addToCartHandler = () =>
  {
    dispatch(addItemsToCart(id,quantity));
    alert("Item Added To Cart Successfully")
  }
  return (

    <>  
      {loading ? <Loading/> :
       (<Fragment>
      <div className='main'>
      <div className="productImageShow">
        <Carousel autoPlay={false} navButtonsAlwaysVisible={true}>
          {product.image && product.image.map((element,i)=>(
            <img className='CarouselImg' key={element.img_url} src={element.img_url}  alt={`${i} Slide`} />
          ))}
        </Carousel>   

      </div>

      <div className="productDetail">

        <div className="detail1">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
        </div>
        
        <div className="detail2">
          <ReactStars {...options}/>
          <span>{`${product.noOfReviews} Reviews`}</span>
        </div>

        <div className="detail3">
          <h1>{`₹${product.price}`}</h1>
          <div className="detail31">
            <div className="detail311">
              <button onClick={decreaseQuantity}> - </button>
              <input readOnly type="number" value={quantity} />
              <button onClick={increaseQuantity} > + </button>
            </div>
            <button onClick={addToCartHandler} >Add To Cart</button>
          </div>

          <p>
            status : <b className={product.quantity < 1 ?"redColor" : "greenColor" }>
              {product.quantity<1 ? "OutOfStoke" : "InStoke"}
            </b>
          </p>
        </div>

        <button className='SubmitReview'>Submit Review</button>
      </div>
    
    </div>

    {/* <div className="review">
      hiii
    </div> */}
      
    </Fragment>)


    }
    </>
    
  )
}

export default ProductDetail

