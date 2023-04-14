// const asyncError = require("../middleware/asyncError");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// exports.processPayment = asyncError(async(req,res)=>
// {

//   const myPayment = await stripe.paymentIntents.create({
//     amount : req.body.amount,
//     currency : "inr",
//     metadata : {company : "Enigmaticomm"},
//   }); 
  
//   if(myPayment)
//     res.status(200).json({success : true, client_secret : myPayment.client_secret})
//   else
//     res.status(404).json({success:false});
// });


// exports.sendStripeAPIKey = asyncError(async(req,res,next)=>
// {
//   res.status(200).json({stripeApiKey: process.env.STRIPE_API_KEY})
// });