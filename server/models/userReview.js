const mongoose=  require("mongoose");

const reviewSchema = mongoose.Schema({

    name: String,
    email: String,
    mobile: String,
    rev: String,
    
});

module.exports =mongoose.model('Review',reviewSchema);