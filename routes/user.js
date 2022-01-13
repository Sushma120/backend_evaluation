const express = require('express');

module.exports = function (app, mongoose) {
  const router = express.Router();

  const { authenticate } = require("../auth/auth");
  const controller = require("../controller/user")(mongoose);

  router.post('/signUp', authenticate, controller.signUp);
  router.post('/signIn', authenticate, controller.signIn);
  router.post('/forgotPassword', authenticate, controller.forgotPassword);
  router.post('/resetPassword', authenticate, controller.resetPassword);

  app.use('/base/api/v1/users/', router);


}