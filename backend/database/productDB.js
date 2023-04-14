const req = require("express/lib/request");
const Product = require("./productSchema");
const features = require("../features/features");
const asyncError = require("../middleware/asyncError");

// module.exports = getAllProduct;
exports.getAllProduct =asyncError(async (req,res)=>
{
  const productPerPage = 8;
  const numberOfProucts =await Product.countDocuments();
  const feature = new features(Product.find(), req.query).search().pagination(productPerPage).filter();
  const allProducts = await feature.query;
  res.status(200).json({success: true,productCount : allProducts.length, allProducts});
});

// get All Product 
exports.getAllProductAdmin =asyncError(async (req,res)=>
{
  const products = await Product.find();
  res.status(200).json({success: true, products});
});

// Get product detail of a product by giving its ID
exports.getProductDetail =asyncError(async (req,res) =>
{
  let product = await Product.findById(req.params.id);
  if(!product)
   return res.json({success : false, message :"product not found", status :404});
  return res.json({success : true, product});

});
// module.exports = createProduct;
exports.createProduct = asyncError(async (req,res,next) =>
{
  const product = await Product.create(req.body);
  res.status(201).json({success : true, product});
});

// Update a product by giving its ID
exports.updateProduct = asyncError(async (req,res) =>
{
  let product = await Product.findById(req.params.id);
  if(!product)
  return res.json({success : false, message :"product not found"});

  product = await Product.findByIdAndUpdate(req.params.id,req.body);
  return res.json({success : true, message :"updated successfully"});
});

// Delete a product by giving its ID
exports.deleteProduct =asyncError(async (req,res) =>
{
  let product = await Product.findById(req.params.id);
  if(!product)
   return res.json({success : false, message :"product not found"});

  await product.remove();
  return res.json({success : true, message :"deleted successfully"});
});


/// THIS FUCTION IS YET TO COMPLETE.....DO IT AS FAST AS POSSIBLE....NOW I AM MOVING TO ORDER CONTROLLER PART....
// create review
exports.createReview = asyncError (async(req,res)=>
{
    const review = {
      user : req.user._id,
      name : req.user.name,
      rating : req.body.rating,
      comment : req.body.comment
    };

    // find product 
    const product = await Product.findById(req.body.productId);

    if(!product)
      return res.json({success : false, message : `no such product exist with product ID : ${req.body.productId}`});

     // Did logged in user ever give the review to this product. 
     // If the user gave, then update that review,
     // else create review for the user for the given product... 
    let reviewed =0
    for(let i=0;i<product.reviews.length;i++)
    {
      if(product.reviews[i].user.toString() === req.user._id.toString())
      {
        reviewed =1;
        product.reviews[i].rating = req.body.rating;
        product.reviews[i].comment = req.body.comment;
        break;
      }
       
    }

    if(!reviewed)
    {
      product.reviews.push(review);
      product.noOfReviews = product.reviews.length;
    }
    
   
    // update overall rating of the product. (Give the average of all the ratings)
    let totalRating = 0;
    product.reviews.forEach(rat => {
      totalRating+=rat.rating;
    });
    product.ratings = totalRating/product.reviews.length;

    await product.save({validateBeforeSave:false});
    res.json({success : true, message : "review saved successfully"});
});

// get all reviews of a products
exports.getAllProductReviewByAdmin = asyncError( async(req,res) =>{

    const product = await Product.findById(req.query.id);
    
    if(!product)
      return res.json({success : false, message : `no product found with product ID : ${req.query.id}`})

      res.json({success : true, "no of reviews" : product.reviews.length,Reviews : product.reviews});

});

// delete all reviews of a products
exports.deleteProductReviewByAdmin = asyncError( async(req,res) =>{

  const product = await Product.findById(req.query.productId);
  
  if(!product)
    return res.json({success : false, message : `no product found with product ID : ${req.query.productId}`})

   
  const wantedReviews = product.reviews.filter(rev => rev._id.toString()!==req.query.id.toString());

  // update rating...
  let totalRating = 0;
    wantedReviews.forEach(rat => {
      totalRating+=rat.rating;
    });

  product.ratings = totalRating/wantedReviews.length;

  product.reviews = wantedReviews;

  product.noOfReviews = wantedReviews.length;

  await product.save({validateBeforeSave:false});
  res.json({success : true, Reviews : product.reviews});

});