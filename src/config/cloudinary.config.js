const cloudinary = require("cloudinary").v2
const config = require("./config")
cloudinary.config({
    cloud_name:config.config.cloudinary.name,
    api_key:config.config.cloudinary.apiKey,
    api_secret:config.config.cloudinary.apiSecret
});
module.exports = cloudinary;