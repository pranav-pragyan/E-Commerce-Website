const Errorhandler = require("../utils/errorhandler");

module.exports = (err,req,res,next) =>
{
  err.statusCode = err.statusCode||500;
  err.msg = err.msg || "Server Side Failure";

  res.status(err.statusCode).json({
    success : false,
    error : err.message
  });
}