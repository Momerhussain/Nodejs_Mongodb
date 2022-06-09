const db = require("../models");
const Books = db.books;
const Category = db.category;

//Add books
exports.addBook = async (req, res) => {
    // Validate request
    if (req.file) {
        req.body.book_cover = req.file.filename;
    } else {
        req.body.book_cover = '';
    }
    if (!(req.body.book_title && req.body.author_name && req.body.category_id && req.body.description)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const books = new Books({
        book_title: req.body.book_title,
        author_name: req.body.author_name,
        category_id: req.body.category_id,
        description: req.body.description
    });
    await books.save(books)
        .then(data => {
            res.json({
                success: 1,
                message: "Book added successfully"
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


//Add category
exports.addCategory = async (req, res) => {

    if (!(req.body.category_title)) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    let cat = await Category.findOne({ category_title:req.body.category_title });
    if (cat) return res.status(409).json({ code: 0, data: `Category already exists with this name ${req.body.category_title} .` });

    const category = new Category({
        category_title: req.body.category_title,
    });
    await category.save(category)
        .then(data => {
            res.json({
                success: 1,
                message: "Category added successfully"
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

exports.getAllCategory = async (req, res) => {
    try {

        let category = await Category.find().sort('-createdAt');
        if (category.length === 0) return res.status(200).send({ code: 0, data: "No category found" })
        return res.status(200).send({ code: 1, data: category });
    }
    catch (err) {
        res.status(500).send(err.stack)
    }
}