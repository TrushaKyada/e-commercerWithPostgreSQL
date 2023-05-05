const db = require('../config/dbconfig');
const user = db.user;
const admin = db.admin;
const jwt = require("jsonwebtoken");
exports.adminVerify = async(req,res,next) => {
    try {
        const token = req.headers['authorization'] 
        if(!token){
            res.status(400).json({
                message:"token is not found, it is required...!!!",
                status:400
            })
        }else{
            const verifyData =  jwt.verify(token,process.env.SECRET_KEY);
            console.log(verifyData.id);
            const adminData = await admin.findOne({where:{id:verifyData.id}});
            if(admin){
                req.admin = adminData;
                next();
            }
            else{
                res.status(404).json({
                    message:"User is not exist",
                    status:404
                })
            }
        }
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({
            message:"Something went wrong..!!!",
            status:500
        })
    }
}
exports.userVerify = async(req,res,next)=>{
    try {
        const token = req.headers['authorization'] 
        if(!token){
            res.status(400).json({
                message:"token is not found, it is required...!!!",
                status:400
            })
        }else{
            const verify = await jwt.verify(token,process.env.SECRET_KEY);
            const userData = await user.findOne({where:{id:verify.id}});
            if(userData){
                req.user = userData;
                next();
            }
            else{
                res.status(404).json({
                    message:"User is not exist",
                    status:404
                })
            }
        }
    } catch (error) {
        console.log("error: " + error);
        res.status(500).json({
            message:"Something went wrong..!!!",
            status:500
        })
    }
}