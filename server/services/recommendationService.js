const Recommendation = require("../models/Recommendations");
const Book = require("../models/Book");

module.exports = class RecommendationService {

    static async getRecommendationsByUserId(userId) {
        try {
            const recommendations = await Recommendation.findOne({ "idUser": userId })
            let data = []
            if (recommendations) {
                let ids = recommendations.books

                data = await Book.find({ idBook: { $in: ids } })
            }

            return data;
        } catch (error) {
            console.error("Error while getting recommendations:", error);
            throw error;
        }
    }

}