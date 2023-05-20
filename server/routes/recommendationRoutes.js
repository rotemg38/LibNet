const  express =  require("express");
const router = express.Router();

const RecommendationsCtrl = require("../controllers/recommendationsController");

router.get("/:userId", RecommendationsCtrl.apiGetRecommendationByUserId);

module.exports =  router;