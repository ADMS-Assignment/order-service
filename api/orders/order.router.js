const {
    create,
    getOrders,
    getOrdersByOrderID,
    updateOrdersByOrderID,
    deleteOrdersByOrderID} =require("./order.controller");
const router = require("express").Router();

router.post("/createOrder",create);
router.get("/allOrders",getOrders);
router.get("/order/:Order_ID",getOrdersByOrderID);
router.put("/updateOrder/:Order_ID",updateOrdersByOrderID);
router.delete("/deleteOrder/:Order_ID",deleteOrdersByOrderID);
module.exports = router;