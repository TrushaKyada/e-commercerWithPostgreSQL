const express = require('express');
const app = express();
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const config = require("./src/config/config");

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

//router
const userRouter = require("./src/routes/user.route");
app.use("/api/user",userRouter);
const adminRouter = require("./src/routes/admin.route");
app.use("/api/admin",adminRouter);
const productRouter = require("./src/routes/product.route");
app.use("/api/product",productRouter);
const addToCartRouter = require("./src/routes/addToCart.route");
app.use("/api/cart",addToCartRouter);
const orderRouter = require("./src/routes/order.route");
app.use("/api/order",orderRouter);

let server;
if(config.protocol == "https"){
    const https = require("https");
    server = https.createServer({
        key:fstat.readFilesync(config.certificate.privkey,"utf8"),
        cert:fstat.readFilesync(config.certificate.fuiichain,"utf8")
    },app)
}
else{
    const http = require('http');
    server = http.createServer(app)
};
server.listen(config.config.port,()=>{
    console.log(`server is running on port : ${config.config.port}`);
});