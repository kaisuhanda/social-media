const { accountsController } = require("../controllers");
const { validateRegis, validateToken } = require("../middleware/validation");
const router = require("express").Router();

router.get("/", accountsController.getData);
router.get("/find/:id", accountsController.getAccount);
router.get("/my-followings", accountsController.myFollowings)
router.post("/register", validateRegis, accountsController.register);
router.post("/login", accountsController.login);
router.get("/keep-login", validateToken, accountsController.keepLogin);
router.patch("/edit", accountsController.editProfile)
router.post("/follow/:id", accountsController.follow)
router.post("/unfollow/:id", accountsController.unfollow)
router.post("/reset-password", validateToken, accountsController.resetPass)

module.exports = router;

// router.post("/forgot-pass", accountsController.forgotPass)
// router.post("/reset-pass", accountsController.resetPass)
// router.get("/:id", accountsController.getAccount);