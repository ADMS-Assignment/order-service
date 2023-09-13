const {
    create,
    getOrders,
    getOrdersByOrderID,
    updateOrdersByOrderID,
    deleteOrdersByOrderID} =require("./order.service");

module.exports={
    create:(req,res)=>{
        const body = req.body;
        create(body,(err,results)=>{
            if(err){
                return res.status(500).json({
                    error:err
                });
            }

            return res.status(200).json({
                message:"order created successfully"
            })
        });
    },

    getOrdersByOrderID: (req,res) =>{
        const Order_ID = req.params.Order_ID;
        getOrdersByOrderID(Order_ID,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                data:results
            });

        });
    },

    getOrders: (req,res)=>{
        getOrders((err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success:1,
                data:results
            });
        });

    },
    updateOrdersByOrderID: (req, res) => {
        const Order_ID = req.params.Order_ID;
        const body = req.body;
        updateOrdersByOrderID(Order_ID, body, (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({
              success: 0,
              message: "Update failed"
            });
          }
          return res.json({
            success: 1,
            message: "Updated successfully"
          });
        });
      },
    deleteOrdersByOrderID:(req,res)=>{
        const Order_ID = req.params.Order_ID;
        deleteOrdersByOrderID(Order_ID,(err,results)=>{
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success:0,
                    message:"Record not Found"
                });
            }
            return res.json({
                success:1,
                message:"Order deleted successfully"
            });
        });
    }
    

};



