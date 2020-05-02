const mongoose = require('mongoose');

const Tag = new mongoose.Schema({
    name: String,
}, { timestamps: true });

module.exports = mongoose.model('Tag', Tag);