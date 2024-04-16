const { tweetsController } = require("../controllers");
// const { validateToken, authorizeCashier } = require("../middleware/validation");
// const { uploader } = require("../uploader");
const router = require("express").Router();

router.get("/", tweetsController.getTweets);
router.get("/likes", tweetsController.getLikes);
router.get("/bookmarks", tweetsController.getBookmarks)
router.post("/tweet", tweetsController.tweet);
router.post("/comment/:id", tweetsController.comment)
router.post("/like/:id", tweetsController.like)
router.post("/unlike/:id", tweetsController.unlike)
router.post('/bookmark/:id', tweetsController.bookmark)
router.post('/unbookmark/:id', tweetsController.unBookMark)
// router.post("/tweet", validateToken, uploader().array("fileUpload", 10), productsController.addProduct);
// router.patch("/delete/:id", validateToken, authorizeCashier, productsController.deleteProduct)
// router.patch("/update/:id", validateToken, authorizeCashier, productsController.updateProduct)

module.exports = router;