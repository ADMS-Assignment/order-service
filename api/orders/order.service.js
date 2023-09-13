const pool = require("../../config/database.js");
const axios = require("axios");

module.exports = {
    create: (data, callBack) => {
        try {
            // Extract the order data from the request
            const {
                Item_ID,
                Customer_ID,
                Order_Date,
                Total,
                Discount,
                Sub_Total,
                Payment_Method,
                products // Replace with the correct property name in your data object
            } = data;

            // Insert the order into the database
            pool.query(
                "INSERT INTO `order` ( Item_ID, Customer_ID, Order_Date, Total, Discount, Sub_Total, Payment_Method) VALUES ( ?, ?, ?, ?, ?, ?, ?)",
                [
                    Item_ID,
                    Customer_ID,
                    Order_Date,
                    Total,
                    Discount,
                    Sub_Total,
                    Payment_Method
                ],
                async (error, results, fields) => {
                    if (error) {
                        return callBack(error);
                    }

                    try {
                        // Send a request to the external API to get customer data
                        const userResponse = await axios.get(`http://localhost:8081/customer/${Customer_ID}`);

                        // Send a request to the external API to reserve products
                        const response = await axios.patch("http://localhost:8080/reserve", {
                            products: products,
                        });

                        // Handle the response from the external API if needed
                        // ...

                        return callBack(null, results);
                    } catch (apiError) {
                        let errorMessage = "An error occurred while processing the order.";

                        if (apiError?.response?.data?.message) {
                            errorMessage = apiError.response.data.message;
                        }

                        // Pass the error message from the external API back to the callback
                        return callBack(errorMessage);
                    }
                }
            );
        } catch (error) {
            return callBack(error);
        }
    },

   

    // get orders
    getOrders: callBack => {
        pool.query(
            'SELECT Order_ID, Item_ID, Customer_ID, Order_Date, Total, Discount, Sub_Total, Payment_Method FROM `order`',
            [],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },

    // get order by ID
    getOrdersByOrderID: (Order_ID, callBack) => {
        pool.query(
            'SELECT Order_ID, Item_ID, Customer_ID, Order_Date, Total, Discount, Sub_Total, Payment_Method FROM `order` WHERE Order_ID = ?',
            [Order_ID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateOrdersByOrderID: (Order_ID,data,callBack) => {
        pool.query(
            "UPDATE `order` SET Item_ID=?, Customer_ID=?, Order_Date=?, Total=?, Discount=?, Sub_Total=?, Payment_Method=? WHERE Order_ID=?",
            [
                data.Item_ID,
                data.Customer_ID,
                data.Order_Date,
                data.Total,
                data.Discount,
                data.Sub_Total,
                data.Payment_Method,
                Order_ID
        
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    
   // delete order
    deleteOrdersByOrderID: (Order_ID, callBack) => {
        pool.query(
            'DELETE FROM `order` WHERE Order_ID = ?',
            [Order_ID],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                } else {
                    if (results.affectedRows > 0) {
                        callBack(null, "Order deleted successfully");
                    } else {                       
                        callBack(null, null);
                    }
                }
            }
        );
    }

};