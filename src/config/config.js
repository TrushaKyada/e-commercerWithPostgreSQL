require("dotenv").config();
exports.config = {
    database:{
        db:process.env.DB || "e-commerce",
        username:process.env.USERNAME,
        password:process.env.PASSWORD,
        dialect:process.env.DIALECT,
        host:process.env.HOST,
        port:process.env.port
    },
    protocol:process.env.PROTOCOL || "http",
    port:process.env.PORT || 8080,
    pool:{
        min:0,
        max:5,
        idle:10000
    },
    cloudinary:{
        name:process.env.CLOUD_NAME,
        apiKey:process.env.API_KEY,
        apiSecret:process.env.API_SECRET
    }
}
