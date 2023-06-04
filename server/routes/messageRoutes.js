const  express =  require("express");
const router = express.Router();

const MessageCtrl = require("../controllers/messageController");

router.get("/", MessageCtrl.apiGetAllMessages);
router.get("/forumActivity", MessageCtrl.apiGetForumActivity);

router.post("/filtered", MessageCtrl.apiGetMessagesByFilter);
router.post("/", MessageCtrl.apiCreateMessage);
router.put("/msg/:msgId", MessageCtrl.apiUpdateMessage);
router.delete("/msg/:msgId", MessageCtrl.apiDeleteMessage);

module.exports =  router;