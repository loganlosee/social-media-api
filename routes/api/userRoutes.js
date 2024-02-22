const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  deleteUser,
  updateUser,
} = require("../../controllers/user.js");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createUser);

router.get("/:userId", getOneUser);

router.delete("/:userId", deleteUser);

router.put("/:userId", updateUser);

module.exports = router;