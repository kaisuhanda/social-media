const { tweetsController } = require("../controllers");
// const { validateToken, authorizeCashier } = require("../middleware/validation");
// const { uploader } = require("../uploader");
const router = require("express").Router();

router.get("/", tweetsController.getTweets);
router.post("/tweet", tweetsController.tweet);
// router.post("/tweet", validateToken, uploader().array("fileUpload", 10), productsController.addProduct);
// router.patch("/delete/:id", validateToken, authorizeCashier, productsController.deleteProduct)
// router.patch("/update/:id", validateToken, authorizeCashier, productsController.updateProduct)

module.exports = router;