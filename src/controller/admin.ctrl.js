const db = require('../config/dbconfig');
const admin = db.admin;
const bcrypt = require("bcrypt");
const Validator = require("validatorjs");
const jwt = require("jsonwebtoken")
exports.login = async(req,res)=>{
    try {
        const validator = new Validator(req.body,{
            email:"required",
            password:"required"
        })
        if(validator.fails()){
            const key = Object.keys(validator.errors.all())[0];
            const error = validator.errors.first(key)
            res.status(400).json({
                error,
                status:400
            })
        }
        else{
            const data = await admin.findOne({where:{email:req.body.email}});
            if(data){
               const valid = await bcrypt.compare(req.body.password,data.password);
               if(valid){
                const token = await jwt.sign({ id: data.id },process.env.SECRET_KEY);
                await admin.update({token:token},{where:{ id: data.id}});
                res.status(200).json({
                    message:"Login Successfully...!!",
                    status:200,
                    token:token
                })
               }
               else{
                res.status(401).json({
                    message:"Invalid credentials...!!",
                    status:401
                })
               }
            }
            else{
                res.status(404).json({
                    message:"You are not registered..!!",
                    status:404
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong...!!!",
            status:500
        })
    }
}