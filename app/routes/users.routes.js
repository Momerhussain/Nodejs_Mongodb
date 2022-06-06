module.exports = app => {
    const { authenticate } = require("../utils/authenticate")

    const users = require("../controller/users.controller");

    var router = require("express").Router();

    // Post 
    router.post("/signUp", users.usersSignup);
    router.post("/login", users.Login);
    router.post("/contactus", users.contactUs);



    app.use('/api', router);
};