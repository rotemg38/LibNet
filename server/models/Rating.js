const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RatingSchema = Schema({
    idUser: {
        type: Number,
        required: true
    },

    idBook: {
        type: Number,
        required: true
    },

    createdAt: {
        type: Date,
        require: true
    },

    rateNum: {
        type: Number,
        require: true
    }

});


module.exports = Rating = mongoose.model("rating", RatingSchema);