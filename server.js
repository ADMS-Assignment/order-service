
require("dotenv").config();
const express = require("express");
const server = express();
const orderRouter = require("./api/orders/order.router");

server.use(express.json());

server.use("/",orderRouter);

const PORT=process.env.SERVER_PORT;
server.listen(PORT,() =>{
  console.log("Server up and running on PORT",PORT);
});
