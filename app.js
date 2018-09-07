var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy =require("passport-local");
var passportLocalMongoose =require("passport-local-mongoose");
var User = require("./models/user");
var UUID = require("uuid");
var Bcrypt = require("bcryptjs");
var seedDB = require("./seeds");
var Project = require("./models/project");

mongoose.connect("mongodb://aditz23:lathen2325@ds247058.mlab.com:47058/procure");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

app.use(bodyParser.json());



app.use(require("express-session")({
  secret: "once again winner",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});
//============================================================================


// serialize and deserialize

app.get("/", function(req, res){
  res.render("index");
});
app.get("/term", function(req, res){
  res.render("term");
});
app.get("/tutorial", function(req, res){
  res.render("tutorial");
});
app.get("/thank", function(req, res){
  res.render("thank");
});


app.get("/profile", function(req, res){


   Project.find({author: req.user._id}, function(err, allProjects){
     if(err){
       console.log(err);
     } else{
    res.render("profile", {projects:allProjects});
     }
   });

});




//create
app.post("/profile", function(req, res){
  console.log(req.body)
  let newProject = new Project(req.body);

  newProject.save((err, success) => {
    if(err){
      console.log(err)
      res.status(500).redirect('errorPage');
    }else
      res.status(200).redirect('profile');
  });

});


//new always above show
app.get("/new", function(req, res){
  //console.log(req.user)
  res.render("new", {user: req.user});
})


//show - shows more info about one campground
app.get("/profile/:id", function(req, res){
//find camp with id nf render showpage
Project.findById(req.params.id).exec(function(err, foundProject){
  res.render("show", {project: foundProject});
});
});

app.post("/project/:id", function(req, res) {
    Project.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/profile");
        } else {
            res.redirect("/profile");
        }
    });
});
app.get("/project/profile", function(req, res){
  res.render("index");
})
//==================================
























// app.get("/profile", function(req, res){
//   res.render("profile");
// });




// app.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
//         res.status(200).render("profile");
//     });
// });

//register
//=================================================================================
app.get("/infactory", function(req, res){
  res.render("infactory");
});
app.get("/inlogin", function(req, res){
  res.render("inlogin");
});
app.get("/inregister", function(req, res){
  res.render("inregister");
});




app.get("/factory", function(req, res){
  res.render("factory");
});
app.post("/factory", function(req, res){
  var newUser = new User({username: req.body.username, ownername:req.body.ownername, email:req.body.email, phone:req.body.phone, product:req.body.product, unit:req.body.unit});
  User.register(newUser, req.body.password, function(err, user){
  if(err)
  {
    console.log(err);
    return res.render("infactory")
  }
  passport.authenticate("local")(req, res, function(){
    res.redirect("thank");
  });
});
});











app.get("/register", function(req, res){
  res.render("register");
});
app.post("/register", function(req, res){
var newUser = new User({username: req.body.username});
User.register(newUser, req.body.password, function(err, user){
  if(err)
  {
    console.log(err);
    return res.render("inregister")
  }
  passport.authenticate("local")(req, res, function(){
    res.redirect("profile");
  });
});
});

app.get("/login", function(req, res){
  res.render("login");
});
app.post("/login", passport.authenticate("local",
{
  successRedirect: "profile",
  failureRedirect: "inlogin"
}), function(req, res){
});
//==================================================================================


app.listen(process.env.PORT || 3000);
