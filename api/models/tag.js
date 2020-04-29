const mongoose = require('mongoose');

let Tag = new mongoose.Schema({
    name: String,
}, { timestamps: true });

module.exports = mongoose.model('Tag', Tag);