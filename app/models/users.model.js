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
            email: {
                type: String,
                validate: {
                    validator: async function (email) {
                        const user = await this.constructor.findOne({ email });
                        if (user) {
                            if (this.id === user.id) {
                                return true;
                            }
                            return false;
                        }
                        return true;
                    },
                    message: props => 'The specified email address is already in use.'
                },
                required: [true, 'User email required']
            },
            userType:String,
            username: String,
            password: String,
            oldPwd: String,
        },


        { timestamps: true }
    );
    const Users = mongoose.model("users", schema);
    return Users;
};