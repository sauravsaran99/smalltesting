const express = require("express");
const router = express.Router();
require("dotenv").config();
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

var newToken = (user) => {
    return jwt.sign({user},process.env.JWT_SECRET_KEY);

};
router.post("",async(req,res)=>{
try{
 const user = await User.findOne({email:req.body.email});
 if(!user)
 {
    return res.send({msg:"Either email or password is incorrect."});
 }
 const match = user.checkPassword(req.body.password); 
 if (!match) {
    return res.send({msg: "Either email or password is incorrect" });
  }

  else{
    const Token = newToken(user);
   //  return res.send({token:Token,error:false});
   return res.send({token:Token,error:false,email:user.email});
  }
}
catch(err) {
   return res.send({msg:err.message});
}

})

module.exports = router;