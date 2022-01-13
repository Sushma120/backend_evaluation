const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const config = require("../config/config");
const utils = require(".././utils/utils");

module.exports = function (mongoose) {

  const schemaUser = mongoose.model('User');

  let userController = {};

  userController.signUp = async (req, res) => {
    try {
      const user = new schemaUser();

      user.id = req.body.id;
      user.mobileNumber = req.body.mobileNumber;
      user.mPin = req.body.mPin;
      user.confirmMpin = req.body.confirmMpin;

      const salt = await bcrypt.genSalt(10);
      user.mPin = await bcrypt.hash(user.mPin, salt);
      user.confirmMpin = await bcrypt.hash(user.confirmMpin, salt);

      schemaUser.signUp(req, res, user);
    }
    catch (error) {
      return utils.sendErrorResponse(res, "bad request", error)

    }
  }

  userController.signIn = async (req, res) => {
    try {
      const user = await schemaUser.findOne({ mobileNumber: req.body.mobileNumber })
      if (!user) {
        return utils.sendErrorResponse(res, "no such user");
      }
      if (await bcrypt.compare(req.body.mPin, user.mPin)) {

        const token = jwt.sign({ id: user._id, mobileNumber: user.mobileNumber }, config.TOKEN_KEY);
        return utils.sendSuccessResponse(res, 'Success', { user, token })
      }
      return utils.sendErrorResponse(res, "incorrect mPin")
    }
    catch (error) {
      console.log(error)
      return utils.sendErrorResponse(res, "bad request")

    }
  }

  userController.forgotPassword = async (req, res) => {
    try {
      const user = await schemaUser.findOne({ mobileNumber: req.body.mobileNumber });
      if (!user) {

        return utils.sendErrorResponse(res, "bad request", error)

      }
      schemaUser.sendOtp(req, res);
      return utils.sendSuccessResponse(res, 'Success')
    }
    catch (error) {

      return utils.sendErrorResponse(res, "bad request", error)

    }

  }

  userController.resetPassword = async (req, res) => {
    try {
      const user = await schemaUser.verifyOtp(req, res, mongoose);
      if (user) {
        const salt = await bcrypt.genSalt(10);
        mPin = await bcrypt.hash(req.body.mPin, salt);
        confirmMpin = await bcrypt.hash(req.body.confirmMpin, salt);
        await user.updateOne({ mPin, confirmMpin }, { new: true });
      }
      return utils.sendSuccessResponse(res, 'Success', user)
    }
    catch (error) {
      console.log(error)
      return utils.sendErrorResponse(res, "bad request", error)
    }
  }
  return userController;
}