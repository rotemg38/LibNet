const  express =  require("express");
const router = express.Router();

const RequestCtrl = require("../controllers/requestController");

router.get("/", RequestCtrl.apiGetAllRequests);

router.post("/filtered", RequestCtrl.apiGetRequestByFilter);
router.post("/", RequestCtrl.apiCreateRequest);
router.put("/request/:reqId", RequestCtrl.apiUpdateRequest);
router.delete("/request/:reqId", RequestCtrl.apiDeleteRequest);

module.exports =  router;