const mongoose=  require("mongoose");

const userSchema = mongoose.Schema({

    name: String,
    email: String,
    mobile: String,
    adhar: String,
    password: String,
    is_admin: Number,
    is_verified: Number,
    is_update: Number,
    request_count: Number,

});

module.exports =mongoose.model('User',userSchema);
