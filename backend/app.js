const express = require("express");
const req = require("express/lib/request");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const middlewareError = require("./middleware/error");

//config.
dotenv.config({path:"backend/config/config.env"});

const products = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
// const payment = require("./routes/paymentRoute");

app.use(express.json());
app.use(cookieParser());


//Route Import...
app.use("/api",products);
app.use("/api",user);
app.use("/api",order);
// app.use("api",payment);
// Middleware for error
app.use(middlewareError);

module.exports = app
