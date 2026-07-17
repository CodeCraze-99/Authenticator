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


app.use(cors());
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'ilovemernstack',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
// Session

// passport 
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

// Signin GET
app.get("/home/register", (req, res) => {
    res.send("workin progress");
})

// Signin POST
app.post("/home/register",async (req, res) => {
   try {
     let { username, email, password, isLogged } = req.body;
    const signedUser = new User({
        email: email,
        isLogged: true,
        // username: username
    });
   await signedUser.save();
    console.log(`${username} logged in`);
    res.send("signing in");
   }
   catch(err) {
    res.redirect("localhost:/8080/home/register");
    throw new ExpressError(500, "Unable to register");
   }
});

// Login route GET
app.get("/home/login", (req, res)=> {
    res.send("work in progress");
})


// Login route POST
app.post("/home/login", passport.authenticate('local', {
    successRedirect: "/home",
    failureRedirect: "/home/signin", failureFlash: true
}), (req, res) => {
    res.send("logged");
})


// profile
app.get("/profile", isLogged, (req, res)=> {
    res.send("work in progress here i will show profile");
})

// Error handling middleware 
app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong"} = err;
    res.status.send(message);
    // in progress
});