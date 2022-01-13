module.exports = function (mongoose) {

    const users = new mongoose.Schema({
        id:{
            type:Number
        },
        mobileNumber: {
            type: String
        },
        mPin: {
            type: String
        },
        confirmMpin: {
            type: String
        }
       
    },
        {
            timestamps: true
        })
    schemaIndex = require("./index")(users, mongoose);
    schemaServices=require("../../services/services")(users,mongoose)

    return mongoose.model('User', users);
}