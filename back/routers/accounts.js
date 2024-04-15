const { accountsController } = require("../controllers");
const { validateRegis, validateToken } = require("../middleware/validation");
const router = require("express").Router();

router.get("/", accountsController.getData);
router.get("/find/:id", accountsController.getAccount);
router.post("/register", validateRegis, accountsController.register);
router.post("/login", accountsController.login);
router.get("/keep-login", validateToken, accountsController.keepLogin);

module.exports = router;

// router.post("/forgot-pass", accountsController.forgotPass)
// router.post("/reset-pass", accountsController.resetPass)
// router.get("/:id", accountsController.getAccount);