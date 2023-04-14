// creating token and saving in cookie...

const sendToken = (user, statuscode,res) =>
{
  const token = user.getJWTtoken();
  
  //options for cookie...(store the token in the cookie instead of local storage).
  const option = {
    expires : new Date(Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000),
    httpOnly : true
  }

  res.status(statuscode).cookie('token',token,option).json({success : true,token,user});
};

module.exports = sendToken;