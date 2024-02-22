const express = require("express");
const {
  addFriend,
  removeFriend,
} = require("../../controllers/friendController");

const router = express.Router();

router.post("/:userId/friends/:friendId", addFriend);

router.delete("/:userId/friends/:friendId", removeFriend);

module.exports = router;