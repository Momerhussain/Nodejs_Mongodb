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
            category_title: String,
            isDelete: { type: Boolean, default: false }
        },


        { timestamps: true }
    );
    const Category = mongoose.model("category", schema);
    return Category;
};