const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RecommendationsSchema = Schema({
    idUser:{
        type: Number,
        required: true
    },

    books:{
        type: Array
    }
    

});


module.exports = Recommendation = mongoose.model("Recommendations", RecommendationsSchema);