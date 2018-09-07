var mongoose = require("mongoose");



//schema setup
var projectSchema = new mongoose.Schema({
  projectname: {type: String, required: true},
  emailid: {type: String, required: true},
  contact: {type: String, required: true},
  unit: {type: String, required: true},
  image: {type: String, required: true},
  description: {type: String, required: true},
  author: {type: String, required: true}
});








module.exports = mongoose.model("Project", projectSchema);
