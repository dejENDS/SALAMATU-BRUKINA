const generateRoutes = (app, passport, User) => {
    //Routes
    //-------------------------
    //----------------------------
    app.get("/", function (req, res) {
        res.render("home", { currentUser: req.user });
    });

    app.get("/about", function (req, res) {
        res.render("about", { currentUser: req.user });
    })

    app.get("/signUp", function (req, res) {
        res.render("signUp", { currentUser: req.user });
    })

    app.post("/signUp", function (req, res) {
        User.register(
            new User({ username: req.body.username, email: req.body.email }),
            req.body.password,
            function (err, user) {
                if (err) {
                    console.log(err);
                    res.redirect("/signUp");
                } else {
                    passport.authenticate("local")(req, res, function () {
                        res.redirect("/login");
                    });
                }
            })
    })

    app.get("/login", function (req, res) {
        res.render("login", { currentUser: req.user });
    })

    app.get("/errLogin", function (req, res) {
        res.render("errLogin", { currentUser: req.user });
    })

    app.post("/login", passport.authenticate("local", {
        successRedirect: "/about",
        failureRedirect: "/errLogin"
    }))

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/login");
    }

    app.get("/secret", isLoggedIn, function (req, res) {
        res.render("index", { currentUser: req.user });
    })

    app.get("/logout", function (req, res) {
        req.logout(
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    res.redirect("/");
                }
            }
        );
    });
}

module.exports = generateRoutes;