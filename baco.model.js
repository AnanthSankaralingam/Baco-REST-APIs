const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose"); //conects to mongodb server

var OrderSchema = new mongoose.Schema({ //schema for the document in compass database
    order_id : {
        type : Decimal128,
        required : "Required" //message shown if parameter not included
    },
    type : {
        type : String
    },
    order_name : {
        type : String
    },
    created_datetime : {
        type : Date
    },
    is_client_notification_ : {
        type:Boolean,
        default:true 
    },
    courier : {
        //type : mongoose.SchemaTypes.Mixed
        type : Array
    }
});

mongoose.model("Order", OrderSchema);