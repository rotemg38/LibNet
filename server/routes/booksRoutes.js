const  express =  require("express");
const router = express.Router();

const BookCtrl = require("../controllers/booksController");

router.get("/category", BookCtrl.apiGetCategories);
router.get("/language", BookCtrl.apiGetLanguages);
router.get("/location", BookCtrl.apiGetLocations);

router.get("/newBooks", BookCtrl.apiGetTop4NewBooks);
router.get("/", BookCtrl.apiGetAllBooks);
router.post("/", BookCtrl.apiCreateBook);
router.post("/book/", BookCtrl.apiGetBooksByFilter);
router.get("/book/:id", BookCtrl.apiGetBookById);
router.put("/book/:id", BookCtrl.apiUpdateBook);
router.delete("/book/:id", BookCtrl.apiDeleteBook);

module.exports =  router;