const express = require("express");
const isLoggedIn = require("../Middleware/isLoggedIn");
const isAdminLoggedIn = require("../Middleware/isAdminLoggedIn");
const controller = require("../Controller/couponController");

const router = express.Router();

router.get("/admin", isAdminLoggedIn, controller.listAdmin);
router.post("/admin", isAdminLoggedIn, controller.create);
router.put("/admin/:id", isAdminLoggedIn, controller.update);
router.delete("/admin/:id", isAdminLoggedIn, controller.remove);
router.get("/", isLoggedIn, controller.listAvailable);
router.post("/preview", isLoggedIn, controller.preview);

module.exports = router;
