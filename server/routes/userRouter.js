const  express =  require("express");
const router = express.Router();

const UserCtrl = require("../controllers/userController");


router.post("/signin", UserCtrl.apiSignInUser);

router.get("/groupAge", UserCtrl.apiGetGroupByAges);
router.get("/", UserCtrl.apiGetAllUsers);
router.post("/", UserCtrl.apiCreateUser);
router.post("/user/", UserCtrl.apiGetUsersByFilter);
router.get("/user/:id", UserCtrl.apiGetUserById);

router.put("/user/:id", UserCtrl.apiUpdateUser);
router.put("/pass/:id", UserCtrl.apiUpdatePassUser);

router.delete("/user/:id", UserCtrl.apiDeleteUser);

module.exports =  router;