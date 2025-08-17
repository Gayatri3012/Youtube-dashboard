const mongoose = require('mongoose');

const eventLogSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    eventType: { type: String, required: true },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EventLog', eventLogSchema);
