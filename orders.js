//to prevent clutter in the index.js file - controller folder for all the routes and information transfer
//connect to mongodb and send the schema here in controller
const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const OrderModel = mongoose.model("Order") //gets 'OrderModel' from the schema file

router.get("/edit", (req,res)=>{
    res.render("edit-order")
});

router.get("/add", (req,res)=>{
    res.render("add-order");
});

router.post("/add", (req,res)=>{        //adding order

    var order1 = new OrderModel();
    order1.order_id = req.body.order_id;
    order1.type = req.body.type;
    order1.order_name= req.body.order_name;
    let today = new Date().toISOString().slice(0, 10)
    order1.created_datetime= today;
    order1.is_client_notification_= req.body.is_client_notification_;
    order1.courier = req.body.courier;  
    
    if(order1 !== null){
        order1.save( (err, doc)=>{
            if(!err){
                res.redirect("/orders/info")
            }
            else{
                res.send("Please fill out all categories")
            }
        });
    }
});

router.post("/edit", (req,res)=>{           //updating order

    OrderModel.findOneAndUpdate({order_id : 123}, {order_name:req.body.order_name, type:req.body.type,is_client_notification_:req.body.is_client_notification_,courier:req.body.courier}, {new:true},(err,doc)=>{
        if(!err){
            console.log("updated");
            res.redirect("/orders/info");
        }
        else{
            res.send("Could not update");
        }
    } );
    
});

router.get("/info", (req,res)=>{  //gettting data for display- docs is a collection from the compass database
    
    OrderModel.find((err, docs)=>{
        if(!err){
            res.render("info", { data : docs })
        }
        else{
            res.send("Err")
        }
    });
});

module.exports = router;