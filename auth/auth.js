const jwt = require("jsonwebtoken");
const config=require("../config/config");
 
const authenticate=async(req,res,next)=>{  
  try{

    const authHeader=req.headers.authorization;
    const token=req.body.token||req.query.token||authHeader;
    const decode= jwt.verify(token,config.TOKEN_KEY)
    next();

  }catch(error){

    throw error;
    
  }
}
module.exports = { authenticate };