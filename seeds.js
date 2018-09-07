var mongoose = require("mongoose");
var Project = require("./models/project");

var data = []


function seedDB(){

             //add a few campgrounds
            data.forEach(function(seed){
                Project.create(seed, function(err, project){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a project");

                    }
                });
            });
        }

module.exports = seedDB;
