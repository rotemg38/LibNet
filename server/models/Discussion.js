const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DiscussionSchema = Schema({
    idDisc:{
        type: Number,
        required: true
    },

    idForum:{
        type: Number,
        required: true
    },

    idUserOwner:{
        type: Number,
        required: true
    },

    discName:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        require: true
    },

    seenNum:{
        type: Number
    }

});


module.exports = Discussion = mongoose.model("discussion", DiscussionSchema);