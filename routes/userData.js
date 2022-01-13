const express = require('express');

module.exports = function (app, mongoose) {
  const router = express.Router();

  const { authenticate } = require("../auth/auth");
  const controller = require("../controller/userData")(mongoose)

  router.post('/addNewData', authenticate, controller.addNewData);
  router.get('/home/:id', authenticate,controller.homeScreen);
  router.put('editDetails/:_id', authenticate, controller.editDetails);
  router.get('/search', authenticate, controller.searchItem);
  router.post('/sync',authenticate,controller.syncData);
  router.get('/copy',authenticate,controller.copyPassword)

  app.use('/base/api/v1/userDatas/', router);


}