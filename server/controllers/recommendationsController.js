
const RecommendationService = require("../services/recommendationService");

module.exports = class Recommendation {

    static async apiGetRecommendationByUserId(req, res, next) {
        try {
            let userId = req.params.userId || {};
            const recommendation = await RecommendationService.getRecommendationsByUserId(userId);

            if (!recommendation) {
                res.status(404).json("No recommendation found!")
            } else {
                res.json(recommendation);
            }

        } catch (error) {
            res.status(500).json({ error: error })
        }

    }

}
