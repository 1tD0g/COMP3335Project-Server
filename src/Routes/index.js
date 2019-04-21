const multer = require('multer');

const uploadHandler = require("../RequestHandlers/Post/upload");
const forgotHandler = require("../RequestHandlers/Post/forgot");
const profileHandler = require("../RequestHandlers/Post/profile");
const filesHandler = require("../RequestHandlers/Get/files");
const shareViaEmail = require("../RequestHandlers/Post/shareViaEmail");
const fileDeleteHandler = require("../RequestHandlers/Post/fileDelete");
const fileUpdateHandler = require("../RequestHandlers/Post/fileUpdate");
const downloadHandler = require("../RequestHandlers/Get/downloadHandler");
const getLinkHandler = require("../RequestHandlers/Post/getLinkHandler");
const shareHandler = require("../RequestHandlers/Get/shareHandler");
const sharePageHandler = require("../RequestHandlers/Get/sharePageHandler");
const upload = multer({
    dest: `${__dirname}/../../uploads`
});

const loggedIn = (req, res, next) => req.user ? res.redirect("/profile") : next();
const authed = (req, res, next) =>{
    if(req.isAuthenticated()) return next();
    req.flash("loginMessage", "Error: Please Login First.");
    res.redirect("/login");
}

module.exports = (app, passport) => {
    app.post("/login", passport.authenticate("login", {
        successRedirect: "/profile",
        failureRedirect: "/login",
        failureFlash: true,
        successFlash: true
    }));
    app.post("/upload", upload.single("file"), uploadHandler);
    app.post("/register", passport.authenticate("register", {
        successRedirect: "/profile",
        failureRedirect: "/register",
        failureFlash: true,
        successFlash: true
    }))
    app.post("/forgot", forgotHandler);
    app.post("/profile", (req, res, next) => req.user ? next() : res.redirect("/login"), profileHandler);
    app.get("/", (req, res) => res.render("index", {
        user: req.user,
        failMessage: req.flash("failMessage")
    }))
    app.get("/upload", authed, (req, res) => res.render("upload", {
        user: req.user
    }))
    app.get("/login", loggedIn, (req, res) => res.render("login", {
        message: req.flash("loginMessage"),
        successMessage: req.flash("registerMessage")
    }))
    app.get("/logout", (req, res) => {
        req.logout();
        res.redirect("/");
    })
    app.get("/register", loggedIn, (req, res) => res.render("register", {
        message: req.flash("registerMessage")
    }))
    app.get("/forgot", loggedIn, (req, res) => res.render("forgot", {
        message: req.flash("failedMessage"),
        successMessage: req.flash("successMessage")
    }))
    app.get("/profile", authed, (req, res) => res.render("profile", {
        user: req.user,
        successMessage: req.flash("registerMessage"),
        message: req.flash("profileMessage")
    }))
    app.get("/share", authed, sharePageHandler);
    app.get("/share/:hash", shareHandler);
    app.get("/download/:link", downloadHandler)
    app.get("/files", authed, filesHandler)
    app.post("/files/delete", authed, fileDeleteHandler)
    app.post("/files/update", authed, fileUpdateHandler);
    app.post("/share/email", authed, shareViaEmail)
    app.post("/files/getLink", (req, res, next) => {
        if(req.isAuthenticated()) return next();
        return res.json({
            error: "Please Login First."
        })
    }, getLinkHandler);
}