const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {type: String, require: true, minLength: 3, maxLength: 20},
        password: {type: String, require: true, minLength: 8},
        admin: {type: Boolean, default: false},
        member: {type: Boolean, default: false}
    }
);

module.exports = mongoose.model('user', UserSchema);
