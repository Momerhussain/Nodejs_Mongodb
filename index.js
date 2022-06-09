const express = require("express");
const app = express();
const db = require("./app/models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require('express-session');


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "mysecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(cookieParser());


global.__basedir = __dirname;

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


//get request 
app.get("/", (req, res) => {
    res.json({
        message: "hello"
    });
});


db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });




require("./app/routes/users.routes")(app);
require("./app/routes/books.routes")(app);



module.exports = app;