var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserSchema = new mongoose.Schema({
  username: String,
  ownername: String,
  email: String,
  phone: String,
  product: String,
  unit: String,
  password: String

});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User", UserSchema);
