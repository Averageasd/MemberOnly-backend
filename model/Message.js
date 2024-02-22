const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: {type: String, require: true, minLength: 3, maxLength: 50},
        message: {type: String, require: true, minLength: 3, maxLength: 250},
        author: {type: Schema.Types.ObjectId, ref: "user"},
        date: {type: Date, default: new Date()}
    }
);

module.exports = mongoose.model('message', MessageSchema);
