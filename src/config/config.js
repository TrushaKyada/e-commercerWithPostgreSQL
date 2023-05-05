require("dotenv").config();
exports.config = {
    database:{
        db:process.env.DB || "e-commerce",
        username:process.env.USERNAME || "postgres",
        password:process.env.PASSWORD || "123",
        dialect:process.env.DIALECT || "postgres",
        host:process.env.HOST || "localhost",
        port:process.env.port || 5433
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