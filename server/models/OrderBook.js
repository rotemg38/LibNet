const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const orderBookSchema = Schema({

    idUser: {
        type: Number,
        required: true
    },

    idBook: {
        type: Number,
        required: true
    },

    dateInv: {
        type: Date,
        require: true
    },
    //waiting/received/cancle
    status: {
        type: String,
        required: true,
    },
    //date the book arrive to the library and the user can get it
    dateArrive: {
        type: Date
    }
});


module.exports = orderBook = mongoose.model("orderBook", orderBookSchema);