const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose").default;
console.log(passportLocalMongoose);
console.log(typeof passportLocalMongoose);
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
  
    isLogged: {
        type: Boolean,
        default: false
    }
    
});
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);




// ye users banke export hua hai
module.exports = User;