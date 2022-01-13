
const bcrypt = require("bcrypt");
const utils = require("../../utils/utils")

module.exports = function (schema) {

  schema.statics.signUp = async function (req, res, user) {
    if (user.mPin == user.confirmMpin) {
      const data = await user.save();
      utils.sendSuccessResponse(res, 'Success', data)

    }
    else {
      utils.sendErrorResponse(res, "incorrect mpin")
    }
  }

}