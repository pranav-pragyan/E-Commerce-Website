// const asyncError = require("./asyncError");
// const jwt = require("jsonwebtoken");
// const User = require("../database/usersDB");

// const isAuthenticatedUser = asyncError(async(req,res) =>
// {
//     const {token} = req.cookies; // token will be recieved into object type
//     // console.log(token);
//     if(!token)
//       return res.json({success : false, message :"Please login to access the resources"});

//     const decodedData = jwt.verify(token,process.env.JWT_SECRET);
    
//     req.user = await User.findById(decodedData.id);
//      return res.json({success : true});
// });

// module.exports = isAuthenticatedUser;