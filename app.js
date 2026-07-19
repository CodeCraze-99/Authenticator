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
app.use(cors({
    origin: ["http://localhost:5174"],
    credentials: true,
}));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'ilovemernstack',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
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

function isLogged(req, res, next) {
    console.log("Authenticated:", req.isAuthenticated());
    console.log("User:", req.user);

    if (req.isAuthenticated()) {
        return next();
    }

    return res.status(401).json({
        message: "Not authenticated"
    });
}

app.post("/home/register", async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const signedUser = new User({
            username,
            email,
        });

        await User.register(signedUser, password);

        req.login(signedUser, (err) => {
            if (err) {
                return next(err);
            }

            console.log(`${username} logged in`);

            res.status(201).json({
                message: "Account created successfully."
            });
        });

    } catch (err) {
        console.log(err);

        if (err.name === "UserExistsError") {
            return res.status(409).json({
                message: "Username already exists. Choose a different username."
            });
        }

        if (err.code === 11000) {
            if (err.keyValue?.username) {
                return res.status(409).json({
                    message: "Username already exists. Choose a different username."
                });
            }

            if (err.keyValue?.email) {
                return res.status(409).json({
                    message: "An account with that email already exists."
                });
            }
        }

        return res.status(500).json({
            message: err.message || "Registration failed. Please try again."
        });
    }
});

// Login route 
app.post("/home/login", (req, res, next) => {
    passport.authenticate("local", (err, user) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password."
            });
        }

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }

            console.log(`${user.username} logged in`);

            return res.status(200).json({
                message: "Logged in successfully.",
                user: {
                    username: user.username,
                    email: user.email,
                }
            });
        });
    })(req, res, next);
});


// logout route 
app.post("/home/logout", (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.json({message: "logged out"});
    });
});

// profile
app.get("/home/profile", isLogged, (req, res) => {
    res.json({
        username: req.user.username,
        email: req.user.email,
    });
});

// Delete route
app.delete("/home/delete", async (req, res, next) => {
    let id = req.user._id
    await User.findByIdAndDelete(id);
    res.json({
        message: "succesfully deleted"
    });
})

// Error handling middleware 
app.use((err, req, res, next) => {
    let { status = 500, message = "something went wrong" } = err;
    res.status(status).json({message: message});
    // in progress
});