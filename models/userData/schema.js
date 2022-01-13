module.exports = function (mongoose) {
    const userDatas = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        categoryName:{
            type:String
        },
        url: {
            type: String
        },
        siteName: {
            type: String
        },
        folder: {
            type: String
        },
        userName: {
            type: String
        },
        sitePassword: {
            type: String
        },
        notes:{
            type:String
        }
    },{
        timestamps:true
    })
    schemaIndex= require("./index")(userDatas, mongoose);

    return mongoose.model('UserData', userDatas);
}