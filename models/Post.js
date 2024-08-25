const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  subject: { type: String, required: true },
  description: { type: String, required: true },
  tags: [String], // Array of tags
  likes: { type: Number, default: 0 }, // Number of likes
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // Array of comment references
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Post', postSchema);