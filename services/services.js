const config = require("../config/config");
const client = require('twilio')(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
const bcrypt = require("bcrypt");

module.exports = function (schema) {
  schema.statics.sendOtp = async function (req, res) {
    await client.verify.services(config.SERVICE_ID).verifications.create({
      channel: "sms",
      to: `+91${req.body.mobileNumber}`,
      from: config.PHONE_NUMBER
    });
  }

  schema.statics.verifyOtp = async function (req, res, mongoose) {
    const schema = mongoose.model('User');
    const verify = await client.verify.services(config.SERVICE_ID).verificationChecks.create({
      to: `+91${req.body.mobileNumber}`,
      code: req.body.code,
      from: config.PHONE_NUMBER
    })
    if (verify.status == 'approved') {
      const user = await schema.findOne({ mobileNumber: req.body.mobileNumber });
      return user;

    }
  }




}