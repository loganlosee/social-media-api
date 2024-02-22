const mongoose = require("mongoose");
const { Thought, User } = require("../models");

const createReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, userId } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(thoughtId) || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid thoughtId or userId" });
    }

    if (!reactionBody) {
      return res.status(400).json({ error: "Reaction body is required" });
    }

    const thoughtExists = await Thought.exists({ _id: thoughtId });
    const user = await User.findById(userId);

    if (!thoughtExists || !user) {
      return res.status(404).json({ error: "Thought or User not found" });
    }

    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $addToSet: { reactions: { reactionBody, username: user.username } } },
      { new: true }
    );

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;

  try {
    const thought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.json(thought);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOneReaction = async (req, res) => {
  const { reactionId } = req.params;

  try {
    const thought = await Thought.findOne({ "reactions._id": reactionId });

    if (!thought) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    const reaction = thought.reactions.id(reactionId);
    res.json(reaction || { error: "Reaction not found" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateReaction = async (req, res) => {
  const { reactionId } = req.params;
  const { reactionBody } = req.body;

  try {
    if (!reactionBody || !mongoose.Types.ObjectId.isValid(reactionId)) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const updatedReaction = await Thought.findOneAndUpdate(
      { "reactions._id": reactionId },
      { $set: { "reactions.$.reactionBody": reactionBody } },
      { new: true }
    );

    if (!updatedReaction) {
      return res.status(404).json({ error: "Reaction not found" });
    }

    res.json(updatedReaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createReaction, deleteReaction, getOneReaction, updateReaction };
