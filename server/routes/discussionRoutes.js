const  express =  require("express");
const router = express.Router();

const DiscussionCtrl = require("../controllers/discussionController");

router.get("/", DiscussionCtrl.apiGetAllDiscussions);
router.get("/withReplies/:forumId", DiscussionCtrl.apiGetDiscussionsByForumWithReplies);

router.post("/filtered", DiscussionCtrl.apiGetDiscussionsByFilter);
router.post("/", DiscussionCtrl.apiCreateDiscussion);
router.put("/disc/:discId", DiscussionCtrl.apiUpdateDiscussion);
router.delete("/disc/:discId", DiscussionCtrl.apiDeleteDiscussion);

module.exports =  router;