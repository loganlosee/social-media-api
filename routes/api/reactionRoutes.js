const express = require("express");
const {
  createReaction,
  deleteReaction,
  getOneReaction,
  updateReaction,
} = require("../../controllers/reaction");

const router = express.Router();

router.post("/:thoughtId", createReaction);

router.get("/:reactionId", getOneReaction);

router.put("/:reactionId", updateReaction);

router.delete("/:reactionId/thoughts/:thoughtId", deleteReaction);

module.exports = router;