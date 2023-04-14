// Error is the default class in Node.js
class Errorhandler extends Error 
{
  constructor(msg,statusCode)
  {
    super(msg);  // super is the consructor of Error class
    this.statusCode = statusCode;
    Error.captureStackTrace(this,this.constructor);
  }
} 

module.exports = Errorhandler