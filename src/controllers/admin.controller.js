const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();
router.get("", 
 verifiedToken,
async(req,res) => {

    try{
        const users = await User.find().lean().exec();
        return res.send(users);
    }
    catch(err){
        return res.send({msg:err.message});
    }
    


})
function verifiedToken (req,res,next){
 let bearerHeader = req.headers["authorization"] ;
 if(typeof bearerHeader !== "undefined"){
  let value = bearerHeader.split(' ');
  let token = value[1];
   jwt.verify(token,process.env.JWT_SECRET_KEY,(err,result) =>{
    if(err)
    {
        return res.status(200).send({ err: err, result: result });
    }
    else{
        next();
    }
   })
 }
 else{
    res.sendStatus(403)
 }
}
module.exports = router;