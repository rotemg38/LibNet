const  express =  require("express");
const router = express.Router();

const RatingCtrl = require("../controllers/ratingController");

router.get("/avg/:bookId", RatingCtrl.apiGetAvgRateByBook);

router.get("/", RatingCtrl.apiGetAllRatings);
router.get("/topRated", RatingCtrl.apiGetTopRatedBooks);

router.post("/filtered", RatingCtrl.apiGetRatingByFilter);
router.post("/", RatingCtrl.apiCreateRating);
router.post("/ratingsBook/", RatingCtrl.apiGetRatingBooksByFilter);
router.post("/ratingsUser/", RatingCtrl.apiGetRatingUsersByFilter);
router.put("/ratings/:userId/:bookId", RatingCtrl.apiUpdateRating);
router.delete("/ratings/:userId/:bookId", RatingCtrl.apiDeleteRating);

module.exports =  router;