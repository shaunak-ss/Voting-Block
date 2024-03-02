const mongoose=  require("mongoose");

const updateSchema = mongoose.Schema({

    userid:String,
    name: String,
    email: String,
    mobile: String,
    sentrequest : Number,

});

module.exports =mongoose.model('Updateuser',updateSchema);