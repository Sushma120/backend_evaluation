const copyPaste = require("copy-paste");
const fs = require("fs");
const config = require("../config/config");
const utils = require(".././utils/utils");

module.exports = function (mongoose) {

    const schemaUserData = mongoose.model('UserData');

    let userDataController = {};

    userDataController.addNewData = async (req, res) => {
        try {

            const userSiteDetails = new schemaUserData();

            userSiteDetails.userId = req.body.userId;
            userSiteDetails.categoryName = req.body.categoryName;
            userSiteDetails.url = req.body.url;
            userSiteDetails.siteName = req.body.siteName;
            userSiteDetails.folder = req.body.folder;
            userSiteDetails.userName = req.body.userName;
            userSiteDetails.sitePassword = req.body.sitePassword;
            userSiteDetails.notes = req.body.notes;

           const userDetails=await  schemaUserData.addNewData(req, res, userSiteDetails);
           return utils.sendSuccessResponse(res, 'Success', userDetails)

        }
        catch (error) {
            return utils.sendErrorResponse(res, "bad request", error)
        }
    }

    userDataController.homeScreen = async (req, res) => {
        try {
            let id = req.params.userId;
            let siteDetails = await schemaUserData.find(id, { siteName: 1, url: 1, _id: 0 });
            return utils.sendSuccessResponse(res, 'Success', siteDetails)
        }
        catch (error) {
            return utils.sendErrorResponse(res, "bad request", error)
        }
    }

userDataController.searchItem = async (req, res) => {
        try {
            const filteredData = await schemaUserData.searchItem(req, res, mongoose);
            return utils.sendSuccessResponse(res, 'Success', filteredData)
        }
        catch (error) {

            return utils.sendErrorResponse(res, "bad request", error)
        }
    }
    userDataController.editDetails= async (req, res) => {
        try {
            const updateData = await schemaUserData.editDetails(req, res, mongoose);
            return utils.sendSuccessResponse(res, 'Success', updateData)
        }
        catch (error) {
            return utils.sendErrorResponse(res, "bad request", error)
        }
    }

    userDataController.syncData = async (req, res) => {
        try {

            let data = await schemaUserData.find(req.body);
            let userId = req.body.userId;

            fs.writeFile(config.root + "/data/" + `${userId}.txt`, JSON.stringify(data), function (err) {
                if (err) console.log(err);
                return utils.sendSuccessResponse(res, 'Success')
            })

        }
        catch (error) {
            return utils.sendErrorResponse(res, "bad request", error)
        }
    }

    userDataController.copyPassword = async (req, res) => {
        try{
            let sitePassword = req.body.sitePassword;
            copyPaste.copy(sitePassword, function (err) {
                if (err) throw err;
                return utils.sendSuccessResponse(res, 'Success')
            })
        }
        catch (error) {
            return utils.sendErrorResponse(res, "bad request", error)
        }
    }
    return userDataController;
}


