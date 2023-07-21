var express                  = require('express'),
    mongoose                 = require('mongoose'),
    bodyParser               = require('body-parser'),
    passport                 = require("passport"),
    localStrategy            = require("passport-local"),
    passportLocalMongoose    = require("passport-local-mongoose"),
    User                     = require("./models/user"),
    expressSession           = require("express-session");
main();
async function main(){
    try{
        mongoose.connect("mongodb+srv://dnnadjei:DAydNNya@salsburkina.yln5sw7.mongodb.net/");
        console.log("Connected");
    }catch(err){
        console.log(err);
    }
}

var app = express();
app.use(expressSession({
    secret: 'keyboard cat', 
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
//-------------------------
//----------------------------
app.get("/", function(req, res){
    res.render("about", {currentUser: req.user});
});

app.get("/signUp", function(req, res){
    res.render("signUp", {currentUser: req.user});
})

app.post("/signUp", function(req, res){
    User.register(
        new User({username: req.body.username, email: req.body.email}), 
            req.body.password,
            function(err, user){
                if(err){
                    console.log(err);
                    res.redirect("/signUp");
                }else{
                    passport.authenticate("local")(req, res, function(){
                        res.redirect("/login");
                    });
                }
    })
})


app.get("/login", function(req, res){
    res.render("login", {currentUser: req.user});
})

app.get("/errLogin", function(req, res){
    res.render("errLogin", {currentUser: req.user});
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/errLogin" 
}))

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get("/secret", isLoggedIn, function(req, res){
    res.render("index", {currentUser: req.user});
})

app.get("/logout", function(req, res){
    req.logout(
        function(err){
            if(err){
                console.log(err);
            }else{
            res.redirect("/");
        }
        }
    );
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



