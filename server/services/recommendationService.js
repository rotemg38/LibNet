const Recommendation = require("../models/Recommendations");

module.exports = class RecommendationService{
   
    static async getRecommendationsByUserId(userId){
        try {
            const recommendations = await Recommendation.aggregate([
                
                { $unwind: {path: "$books" } },
                {
                    $lookup: {
                        from: "books",
                        localField: "books",
                        foreignField: "idBook",
                        as: "bookDetails"
                    }
                },
                { $unwind: {path: "$bookDetails" } },
                {
                    $project: {
                        _id: 0,
                        idUser: "$idUser",
                        idBook: "$bookDetails.idBook",
                        bookName: "$bookDetails.bookName",
                        author: "$bookDetails.author",
                        picBook: "$bookDetails.picBook"
                    }
                }
            ]);
            
            let data = recommendations.filter((elm) => String(elm["idUser"]) === userId);
            
            return data;
        } catch (error) {
            console.error("Error while getting recommendations:", error);
            throw error;
        }
    }

}