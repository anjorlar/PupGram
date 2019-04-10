const express = require("express");
const dogsController = require("../../controllers/dogs");
const authenticate = require("../../middlewares/auth");
const router = express.Router();

router.get("/:id", dogsController.getDogbyId);
router.get("/", dogsController.getDogs);
router.post("/", authenticate, dogsController.postDog);
router.delete("/:id", authenticate, dogsController.deleteDog);
router.get("/user/:id", dogsController.getDogsByUser);

module.exports = router;

