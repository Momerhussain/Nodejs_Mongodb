const argon2 = require('argon2');
const db = require("../models");
const Users = db.users;
const ContactUs = db.contact;
const { generateAccessToken } = require("../utils/authenticate")

// Users signup
exports.usersSignup = async (req, res) => {
    // Validate request
    if (!(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    req.body.oldPwd = hash;
    const users = new Users({
        email: req.body.email,
        password: req.body.password,
        oldPwd: req.body.oldPwd,
        username: req.body.username,
        userType: req.body.userType,
        
    });
    await users.save(users)
        .then(data => {
            res.json({
                success: 1,
                message: "User Register successfully"
            });
        })
        .catch(err => {
            // console.log(err.code);
            res.status(500).send({
                success: 0,
                message: err || "Something wrong"

            });
        });
};


//Login 
exports.Login = async (req, res) => {
    const body = req.body;
    const user = await Users.findOne({ email: body.email });

    if (!user) {
        return res.json({
            success: 0,
            message: 'Invalid email or password'
        })
    }
    if (user) {
        try {

            if (await argon2.verify(user.password, body.password)) {

                var session = req.session;
                session.userId = body.email;
                session.userType = user.userType;

                //password empty for token.
                user.password = undefined;

                let data = {
                    email: user.email,
                    username: user.username,
                    id: user.id,
                }
                const accessToken = await generateAccessToken(data)

                return res.json({
                    success: 1,
                    message: "Login successfully",
                    token: accessToken,
                    session: session
                });
            } else {

                // password did not match
                return res.json({
                    success: 0,
                    data: "Invalid email or password"
                });
            }

        }
        catch (e) {
            // internal failure
            console.log('internal failure');
        }
    }

}

// Contact us
exports.contactUs = async (req, res) => {
    // Validate request
    if (!(req.body)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const contactus = new ContactUs({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        message: req.body.message,
        
    });
    await contactus.save(contactus)
        .then(data => {
            res.json({
                success: 1,
                message: "Your feedback has been submitted"
            });
        })
        .catch(err => {
            // console.log(err.code);
            res.status(500).send({
                success: 0,
                message: err || "Something wrong"

            });
        });
};