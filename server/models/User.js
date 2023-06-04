const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = Schema({
    idUser: {
        type: Number,
        unique: true,
        required: true,
    },

    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    picUser: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    limitBooks: {
        type: Number,
        required: true,
    }
});


module.exports = User = mongoose.model("user", userSchema);