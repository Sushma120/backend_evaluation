const jwt = require("jsonwebtoken");
const config=require("../config/config");
 
const authenticate=async(req,res,next)=>{  
  try{

    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    const decode= jwt.verify(token,config.TOKEN_KEY)
    next();

  }catch(error){

    throw error;
    
  }
}
module.exports = { authenticate };