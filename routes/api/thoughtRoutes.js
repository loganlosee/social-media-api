const express = require('express');
const router = express.Router();
const ThoughtModel = require('../../models/thought'); // Adjust the path as necessary

// Create a new thought
router.post('/thoughts', async (req, res) => {
    try {
        const thought = new ThoughtModel(req.body);
        await thought.save();
        res.status(201).json(thought);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await ThoughtModel.find();
        res.json(thoughts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a thought
router.get('/thoughts/:id', async (req, res) => {
    try {
        const thought = await ThoughtModel.findById(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a thought
router.put('/thoughts/:id', async (req, res) => {
    try {
        const thought = await ThoughtModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a thought
router.delete('/thoughts/:id', async (req, res) => {
    try {
        const thought = await ThoughtModel.findByIdAndDelete(req.params.id);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(204).send();
        } catch (error) {
        res.status(500).json({ message: error.message });
        }
        });
        
        module.exports = router;
        
        
