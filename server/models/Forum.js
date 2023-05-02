const { ListCollectionsCursor } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ForumSchema = Schema({
    idForum:{
        type: Number,
        required: true
    },

    forumName:{
        type: String,
        required: true
    },

    description:{
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        require: true
    }
    

});


module.exports = Forum = mongoose.model("forum", ForumSchema);