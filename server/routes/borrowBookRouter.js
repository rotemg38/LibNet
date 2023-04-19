const  express =  require("express");
const router = express.Router();

const BorrowBookCtrl = require("../controllers/borrowBookController");

router.get("/", BorrowBookCtrl.apiGetAllBorrowBooks);
router.post("/", BorrowBookCtrl.apiCreateBorrowBook);
router.post("/borrowBook/", BorrowBookCtrl.apiGetBorrowBooksByFilter);
router.post("/borrowUser/", BorrowBookCtrl.apiGetBorrowUsersByFilter);
router.put("/borrowBook/:userId/:bookId", BorrowBookCtrl.apiUpdateBorrowBook);
router.put("/returnBook/:userId/:bookId/:dateBorrow", BorrowBookCtrl.apiUpdateReturnBook);
router.delete("/borrowBook/:userId/:bookId", BorrowBookCtrl.apiDeleteBorrowBook);

module.exports =  router;