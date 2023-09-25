const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");
const expressSession = require("express-session");
const generateRoutes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

// Session middleware 
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Passport strategies and serialization/deserialization 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MongoDB using async/await
async function main() {
    try {
        await mongoose.connect("mongodb+srv://dnnadjei:DAydNNya@salsburkina.yln5sw7.mongodb.net/");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

main()
    .then(() => {
        // Generation of routes and starting the Express app
        generateRoutes(app, passport, User);
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Application startup error:", error);
    });


  module.exports = { app, passport };