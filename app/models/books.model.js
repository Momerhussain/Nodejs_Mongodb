const { v4: uuidv4 } = require('uuid');

module.exports = mongoose => {
    var schema = mongoose.Schema(
        {

            id: {
                type: String,
                default: () => {
                    return uuidv4();
                },
                required: true,
                index: true
            },
            book_cover:String,
            book_title: String,
            author_name:String,
            category_id: String,
            description: String,
            isDelete: { type: Boolean, default: false }

        },


        { timestamps: true }
    );
    const Books = mongoose.model("books", schema);
    return Books;
};