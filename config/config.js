const defaults = {

    url: "mongodb://localhost:27017/userDb",
    root: require('path').normalize(__dirname + '/..'),
    port: 3000,

    TOKEN_KEY:"secretKey1234",
    
    TWILIO_ACCOUNT_SID: "ACd676c08948885f71de1e254b088e2b5f",
    TWILIO_AUTH_TOKEN: "4681e578fd4b7f033b4e66d67d6a4a97",
    SERVICE_ID: "VA8132757d97bf3d3276631baad74f4809",
    PHONE_NUMBER:"+17792073010"

};
module.exports = defaults;