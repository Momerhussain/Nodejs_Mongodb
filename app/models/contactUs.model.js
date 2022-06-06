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
            name: String,
            email:String,
            phone: String,
            message: String,
        },


        { timestamps: true }
    );
    const ContactUs = mongoose.model("contactus", schema);
    return ContactUs;
};