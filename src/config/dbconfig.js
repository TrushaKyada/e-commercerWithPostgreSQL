const config = require("../config/config");
const Sequelize = require('sequelize');
require('dotenv').config();
const Config = config.config
const sequelize = new Sequelize("e-commerce","postgres","123",{
    dialect:"postgres",
    host:"localhost",
    port:5433,
    pool:{
        min:Config.pool.min,
        max:Config.pool.max,
        idle:Config.pool.idle
    }
})
sequelize.sync().then(()=>{
    console.log("database connected successfully");
}).catch((error)=>{
    console.log("database is not connected",error);
})
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//model
db.admin = require("../model/admin.model")(sequelize,Sequelize);
db.user = require("../model/user.model")(sequelize,Sequelize);
db.product = require("../model/product.model")(sequelize,Sequelize);
db.addToCart = require("../model/addToCart.model")(sequelize,Sequelize);
db.order = require("../model/order.model")(sequelize,Sequelize);
db.orderHistory = require("../model/orderHistory.model")(sequelize,Sequelize);
module.exports = db;

