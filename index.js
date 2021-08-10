const mongoose = require("mongoose"); //connects to mongodb server

const Order = require("./baco.model"); //imports model/schema

mongoose.connect("mongodb://localhost:27017/baco", { useNewUrlParser: true }, (error)=>{
    if(!error){
        console.log("Connected");
    }
    else{
        console.log("error connecting");
    }
}); //include authentication here if necessary

