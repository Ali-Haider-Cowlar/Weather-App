/* eslint-disable no-undef */

const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.get("/",  userController.getAllUsers);
router.post("/",  userController.addUser);
router.get("/:id",  userController.getById);
router.put("/:id", userController.updateUser);
router.delete("/:id",  userController.deleteUser);

router.post("/login", userController.login);

module.exports = router;
