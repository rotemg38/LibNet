const  express =  require("express");
const router = express.Router();

const ForumCtrl = require("../controllers/forumController");

router.get("/", ForumCtrl.apiGetAllForums);
router.get("/withDiscNum", ForumCtrl.apiGetAllForumsWithDiscNum);

router.post("/filtered", ForumCtrl.apiGetForumByFilter);
router.post("/", ForumCtrl.apiCreateForum);

router.put("/forum/:forumId", ForumCtrl.apiUpdateForum);
router.delete("/forum/:forumId", ForumCtrl.apiDeleteForum);

module.exports =  router;