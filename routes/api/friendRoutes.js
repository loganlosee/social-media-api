const express = require("express");
const {
  addFriend,
  removeFriend,
} = require("../../controllers/friend");

const router = express.Router();

router.post("/:userId/friends/:friendId", addFriend);

router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;