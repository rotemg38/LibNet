const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RequestSchema = Schema({
    idReq:{
        type: Number,
        required: true
    },

    from:{
        type: String,
        required: true
    },

    mail:{
        type: String,
        required: true
    },

    subject:{
        type: String,
        required: true
    },

    content:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        require: true
    },
    seen:{
        type: Boolean,
        require: true
    }

});


module.exports = Request = mongoose.model("request", RequestSchema);