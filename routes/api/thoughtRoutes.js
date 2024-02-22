const express = require("express");
const thoughtController = require("../../controllers/thought");
const reactionController = require("../../controllers/reaction");

const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
} = thoughtController;

const {
    createReaction,
    deleteReaction,
    getOneReaction,
    updateReaction,
} = reactionController;

const router = express.Router();

router.get("/", getAllThoughts);

router.get("/:thoughtId", getOneThought);

router.post("/", createThought);

router.put("/:thoughtId", updateThought);

router.delete("/:thoughtId", deleteThought);

module.exports = router;