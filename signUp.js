var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require("passport"),
    localStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    User = require("./models/user"),
    expressSession = require("express-session"),
    generateRoutes = require('./routes/routes');

try {
    main()
} catch (error) {
    console.log('failed to connect to database')
    return 0;
}

var app = express();
app.use(expressSession({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const port = process.env.PORT || 3000;

generateRoutes(app, passport, User);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

async function main() {
    //     mongoose.connect("mongodb://127.0.0.1:27017/brukina");
    
    try {
        mongoose.connect("mongodb+srv://dnnadjei:DAydNNya@salsburkina.yln5sw7.mongodb.net/");
        console.log("Connected");
    } catch (error) {
        console.log("failed to connect");
        
    }
}

// export default { app, passport };
module.exports = { app, passport };