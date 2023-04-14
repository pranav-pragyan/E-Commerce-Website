const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
{
    name :
    {
      type:String,
      required: [true,"Please Enter The Product Name"]
    },
    description :
    {
      type : String,
      required: [true,"Please Enter The Product Description"]
    },
    price:
    {
      type : Number,
      required: [true,"Please Enter The Product Price"]
    },
    category:
    {
      type : String,
      required: [true,"Please Enter Any Product Category"]
    },
    ratings :
    {
      type : Number,
      default : 0
    },
    noOfReviews :{
        type : Number,
        default : 0
    },
    reviews :[
          {
            user :{type : mongoose.Schema.ObjectId, ref:"User",required:true},
            name : {type :String,required:true},
            rating : {type : Number, required:true},
            comment :{type : String,required : true},
          }
    ],
    image :[
    {
       public_id : 
       {
         type : String,
         required : true
       },
       img_url : 
       {
         type : String,
         required : true
       },
    }],
    
    quantity :
    {
      type : Number,
      required : [true,"Please Enter at least one item"]
    },
    createdAt : 
    {
       type : Date,
       default : Date.now
    }
 }
);

module.exports = mongoose.model("Product",ProductSchema);