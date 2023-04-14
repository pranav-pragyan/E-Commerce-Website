const mongoose = require("mongoose");
const asyncError = require("../middleware/asyncError");
const Product = require("./productSchema");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const orderSchema = new mongoose.Schema({
  shippingInfo :
  {
    address : {type : String, required : true},
    city : {type : String, required : true},
    state : {type : String, required : true},
    pincode : {type : Number, required : true},
    country : {type : String,required : true, default:"India"},
    phoneno : {type : Number, required : true},
  },
  orderItems :[
  {
     name : {type : String, required : true},
     price : {type : Number, required : true},
     quantity : {type : Number, required : true},
     quantityFromDB : {type : Number, required : true},
     image : {type : String, required : true},  
     product_id : {type : mongoose.Schema.ObjectId, ref :"Product", required : true}
   }
  ],
  user : 
  {
     type : mongoose.Schema.ObjectId,
     ref :"User", 
     required : true
  },

  paymentInfo :{
    id : {type :String, required : true},
    status : {type : String, required : true}
  },

  paidAt : {
    type : Date,
    required : true,
  },

  totalProductPrice : {
    type : Number,
    default : 0,
    required : true,
  },

  totalTax : {
    type : Number,
    default : 0,
    required : true,
  },

  shippingTax : {
    type : Number,
    default : 0,
    required : true,
  },
  totalPrice : {
    type : Number,
    default : 0,
    required : true,
  },
  orderStatus :{
    type : String,
    required : true,
    default : "Yet to dispatch",
  },
  deliveredAt : Date,

});

const Order = mongoose.model("Order", orderSchema);

// create new order for user
exports.createOrder = asyncError(async(req,res)=>
{
    const {shippingInfo,orderItems,paymentInfo,totalProductPrice,totalTax,shippingTax,totalPrice} = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      totalProductPrice,
      totalTax,
      shippingTax,
      totalPrice,
      user : req.user._id,
      paidAt : Date.now(),
    });
    //order.save();

    res.json({success : true, message : "Order created successfully", orderDetail : order});
});

// get all order detail of a particular user (obviously logged in user).
exports.getOrderDetail = asyncError(async(req,res)=>
{
  const orders = await Order.find({user : req.user._id});
  
  if(!orders)
    return res.json({success : false , message : "You don't have any order till now"});
  
  res.json({success : true,numOfOrder : orders.length, orders});
});

// get a order detail (by admin)
exports.getOrderDetailByAdmin = asyncError(async(req,res)=>
{
  const order = await Order.findById(req.params.id).populate("user","name email"); // populate acts as Join operation.
  
  if(!order)
    return res.json({success : false , message : `no order found with order ID :${req.params.id}`});
  
  res.json({success : true, order});
});

// get a order detail (by admin)
exports.getOrderDetailByUser = asyncError(async(req,res)=>
{
  const order = await Order.findById(req.params.id).populate("user","name email"); // populate acts as Join operation.
  
  if(!order)
    return res.json({success : false , message : `no order found with order ID :${req.params.id}`});
  
  res.json({success : true, order});
});

// get all orders details (by admin)
exports.getAllOrderDetailByAdmin = asyncError(async(req,res)=>
{
  const orders = await Order.find();

  // find total amount earned till now...
  let totalSum=0;
  
  for(let i=0;i<orders.length;i++)
    totalSum+=orders[i].totalPrice;
  
  res.json({success : true, numofOrders :orders.length ,totalAmount :totalSum,orders});
});

// update order status (by admin)
exports.updateOrderStatusByAdmin = asyncError(async(req,res)=>
{
  const order = await Order.findById(req.params.id);
  
  if(!order)
      return res.json({success : false, message : `no order found with order ID : ${req.params.id}`});
      
  if(order.orderStatus === "delivered")
     return res.json({success : true, message :"This order has already been delivered"});
  
  // update product stock only when product is delivered.  
  if(req.body.status === "delivered")
   {

    order.orderItems.forEach(async (or)=>
    {
        await updateStock(or.productId,or.quantity);
    });
    order.deliveredAt = Date.now();
  } 

  if(req.body.status === "dispatched"&&order.orderStatus === "dispatched")
     return res.json({success : true, message : `This order is already dispatched`});

  const olderOrderStatus = order.orderStatus;
  order.orderStatus = req.body.status;
  
  await order.save({validateBeforeSave : false});
  
  res.json({success : true, message : `Order status updated successfully from ${olderOrderStatus} to ${req.body.status}`});
});

// Stock updating function...
async function updateStock(proId,quantity)
{
  const product = await Product.findById(proId);

  product.quantity-=quantity;
  await product.save({validateBeforeSave : false});
}

// delete order (by admin)
exports.deleteOrderByAdmin = asyncError(async(req,res)=>
{
  const order = await Order.findById(req.params.id);
  
  if(!order)
      return res.json({success : false, message : `no order found with order ID : ${req.params.id}`});

  await order.remove();
  
  res.json({success : true, message : "order deleted successfully"});
});


exports.processPayment = asyncError(async(req,res)=>
{

  const myPayment = await stripe.paymentIntents.create({
    amount : req.body.amount,
    currency : "inr",
    metadata : {company : "Enigmaticomm"},
  }); 
  
  if(myPayment)
    res.status(200).json({success : true, client_secret : myPayment.client_secret})
  else
    res.status(404).json({success:false});
});

exports.sendStripeAPIKey = asyncError(async(req,res,next)=>
{
  res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY})
});