const  express =  require("express");
const router = express.Router();

const OrderBookCtrl = require("../controllers/orderBookController");

router.get("/", OrderBookCtrl.apiGetAllOrderBooks);
router.post("/", OrderBookCtrl.apiCreateOrderBook);
router.post("/orderBook/", OrderBookCtrl.apiGetOrderBooksByFilter);
router.post("/orderUser/", OrderBookCtrl.apiGetOrderUsersByFilter);
router.put("/orderBook/:userId/:bookId", OrderBookCtrl.apiUpdateOrderBook);
router.put("/arriveBook/:bookId", OrderBookCtrl.apiUpdateUserArriveBook);
router.delete("/orderBook/:userId/:bookId", OrderBookCtrl.apiDeleteOrderBook);

module.exports =  router;