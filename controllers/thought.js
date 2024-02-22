const mongoose = require("mongoose");
const { Thought, User } = require("../models");

// Helper function to handle errors
const handleError = (error, res, message = "Internal Server Error") => {
  console.error(error);
  res.status(500).json({ error: message });
};

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find()
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .sort({ createdAt: -1 });
    res.json(thoughts);
  } catch (error) {
    handleError(error, res);
  }
};

const getOneThought = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId)
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" });
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    res.json(thought);
  } catch (error) {
    handleError(error, res);
  }
};

const createThought = async (req, res) => {
  try {
    const { thoughtText, userId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid userId" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newThought = await Thought.create({ thoughtText, username: user.username, userId });
    await User.findByIdAndUpdate(userId, { $addToSet: { thoughts: newThought._id } }, { new: true });
    res.json(newThought);
  } catch (error) {
    handleError(error, res);
  }
};

const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, { thoughtText: req.body.thoughtText }, { new: true, runValidators: true });
    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found to update" });
    }
    res.json(updatedThought);
  } catch (error) {
    handleError(error, res);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }
    await User.updateMany({ thoughts: req.params.thoughtId }, { $pull: { thoughts: req.params.thoughtId } });
    res.json({ message: "Thought deleted" });
  } catch (error) {
    handleError(error, res);
  }
};

module.exports = {
  getAllThoughts,
  getOneThought,
  createThought,
  updateThought,
  deleteThought,
};
