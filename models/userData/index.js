module.exports = function (schemaData) {

  schemaData.statics.addNewData = async (req, res, userSiteDetails) => {

    const userDetails=await userSiteDetails.save();
    return userDetails;

  }


  schemaData.statics.editDetails= async (req, res, mongoose) => {

    const schema = mongoose.model('UserData')
    let _id = req.params._id;
    const updateData = await schema.findByIdAndUpdate(_id, req.body, { new: true });
    return updateData;

  }

  schemaData.statics.searchItem = async (req, res, mongoose) => {

    const schema = mongoose.model('UserData');
    const field=req.query.siteName;
    const filter=await schema.find({siteName:{$regex:field,$options:'$i'}});
    return filter;
  
  }
}