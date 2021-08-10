const connection = require("./model");
const express = require("express");
const application = express(); //create express app
const path = require("path"); //nodejs internal import
const Handlebars = require('handlebars')
const expressHandlerbars = require("express-handlebars");
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyParser = require("body-parser");

const OrderController = require("./controllers/orders"); //used 

application.use(bodyParser.urlencoded({
    extended : true
}));

application.set('views', path.join(__dirname /*nodejs feat for directory of this path*/, "/views/"))

application.engine("hbs", expressHandlerbars({ //for express
    extname : "hbs",
    defaultLayout : "mainlayout",
    layoutsDir : __dirname + "/views/layouts",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

application.set("view engine", "hbs");

application.get("/", (req,res)=>{
    res.render("index", {})
});

application.use("/orders", OrderController) //tells which controller to use, configures order url

application.listen("3000", ()=>{ //for url in browser
    console.log("server started");
});