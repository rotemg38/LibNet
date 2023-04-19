const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const borrowBookSchema = Schema({
    idUser:{
        type: Number,
        required: true
    },

    idBook:{
        type: Number,
        required: true
    },

    dateBorrow:{
        type: Date,
        require: true
    },

    //when the user actually returned the book
    returnDate:{
        type: Date
    },

    numLong:{
        type:Number,
        require: true
    },

    //borrowed/returned
    status: {
        type: String,
        required: true,
    }
});


module.exports = borrowBook = mongoose.model("borrowBook", borrowBookSchema);