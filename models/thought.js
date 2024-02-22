const mongoose = require('mongoose');

function dateFormat(timestamp) {
    return timestamp.toLocaleString();
}

const ThoughtSchema = new mongoose.Schema({
thoughtText: {
type: String,
required: true,
minlength: 1,
maxlength: 280
},
createdAt: {
type: Date,
default: Date.now,
get: dateFormat
},
username: {
type: String,
required: true
},
reactions: [ReactionSchema]
}, {
timestamps: true,
toJSON: { virtuals: true, getters: true },
toObject: { virtuals: true, getters: true }
});

// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
