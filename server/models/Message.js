const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MessageSchema = Schema({
    idDisc: {
        type: Number,
        required: true
    },

    idMsg: {
        type: Number,
        unique: true,
        required: true
    },

    idUser: {
        type: Number,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        require: true
    }

});


module.exports = Message = mongoose.model("message", MessageSchema);