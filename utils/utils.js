const sendSuccessResponse=function (res,message,data ) {
      const results={
          success:true,
          message,
          data
      }
      return res.status(200).json(results)
}
const sendErrorResponse=function(res,message,data){
    const results={
        success:false,
        message,
    }
    return res.status(400).json(results)
}
module.exports={sendSuccessResponse,sendErrorResponse}