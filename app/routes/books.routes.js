module.exports = app => {
    const { authenticate } = require("../utils/authenticate")
    const { upload } = require('../utils/upload');

    const books = require("../controller/books.controller");

    var router = require("express").Router();

    // Post 
    router.post("/addBooks", authenticate,upload.single('book_cover'),books.addBook);
    router.post("/addCategory", authenticate,books.addCategory);
    
    router.get("/getAllCategory", authenticate,books.getAllCategory);
    router.get("/getAllBooks", authenticate,books.getAllBooks);
    router.get("/deleteBook/:id", authenticate, books.deleteBook);
    router.get("/deleteCategory/:id", authenticate, books.deleteCategory);


    app.use('/api', router);
};