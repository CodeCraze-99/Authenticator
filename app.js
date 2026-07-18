const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const MONGO_URL = "mongodb://127.0.0.1:27017/authenticate";
const User = require("./backend/models/user.js")
// const ExpressError = require("./backend/utils/expresserror.js");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require('passport-local-mongoose');
const { serialize } = require("v8");
const session = require("express-session");
const ExpressError = require("./backend/utils/expresserror.js");

console.log("=== THIS IS THE NEW APP ===");
app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'ilovemernstack',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    httpOnly: true
   }
}));
// Session

// passport 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

async function main() {
    await mongoose.connect(MONGO_URL);
}

main()
    .then(() => {
        console.log("Connection successful");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(8080, () => {
    console.log("Listening on port 8080");
});

// middle ware saving private profile page in future development
function isLogged(req, res, next) {
   if(req.isAuthenticated()) {
    return next(); 
   }
   throw new ExpressError(500, "not authenticated to view");
}
app.get("/home/register", (req, res)=> {
    res.send("ee");
})
// Signin 
app.post("/home/register",async (req, res) => {
   try {
    console.log(typeof User.register);
    console.log(req.body);
     let { username, email, password, } = req.body;
    const signedUser = new User({
        username,
        email: email,
    });
    await User.register(signedUser, password);
    console.log(`${username} logged in`);
    res.send("signing in");
   }
//    catch(err) {
//     // throw new ExpressError(500, "Unable to register"); finalized error
    
//    }
catch (err) {
    console.log(err);
    res.status(500).send(err.message);
}
});
app.get("/home/login", (req, res)=> {
    res.send("ee");
});
// Login route 
app.post("/home/login", passport.authenticate('local', {
    successRedirect: "/home",
    failureRedirect: "/home/register", failureFlash: true
}), (req, res) => {
    res.json({ message: "Logged In"});
})

// logout route 
app.post("/home/logout", (req, res, next)=> {
    req.logout(function (err) {
      if(err) return next(err);
      res.send("logged out");
    });
});


// profile
app.get("/profile", isLogged, (req, res)=> {
    res.send("work in progress here i will show profile");
});

// Error handling middleware 
app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong"} = err;
    res.status.send(message);
    // in progress
});