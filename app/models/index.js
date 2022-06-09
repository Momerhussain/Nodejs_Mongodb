const dbConfig = require("../../database/db.config")
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;


//user model
db.users = require("./users.model")(mongoose);
db.contact = require("./contactUs.model")(mongoose);
db.books = require("./books.model")(mongoose);
db.category = require("./category.model")(mongoose);

module.exports = db;