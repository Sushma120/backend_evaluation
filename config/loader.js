const config=require('./config');
const fs=require('fs');

module.exports=async function (app,mongoose){

    const modelPath = config.root+"/models";
    const routerPath = config.root+"/routes";

    fs.readdirSync(modelPath).forEach(function(file) {
        console.log("Loading model : " + file );
        require(modelPath + "/" + file +"/schema.js")(mongoose);
    });

    fs.readdirSync(routerPath).forEach(function(file) {
        console.log("Loading routes : " + file);
        require(routerPath + "/" + file)(app,mongoose);
    });
    
}