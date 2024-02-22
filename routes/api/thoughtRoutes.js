const express = require("express");
const thoughtController = require("../../controllers/thought");


const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
} = thoughtController;

const router = express.Router();

router.get("/", getAllThoughts);

router.get("/:thoughtId", getOneThought);

router.post("/", createThought);

router.put("/:thoughtId", updateThought);

router.delete("/:thoughtId", deleteThought);

module.exports = router;