const mongoose = require('mongoose');

const trafficEventSchema = new mongoose.Schema({
  kind: { type: String, enum: ['page_view', 'sign_in'], required: true },
  sessionId: { type: String, maxlength: 80 },
  path: { type: String, maxlength: 200 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

trafficEventSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 });
trafficEventSchema.index({ kind: 1, createdAt: -1 });
trafficEventSchema.index({ sessionId: 1, createdAt: -1 });

module.exports = mongoose.model('TrafficEvent', trafficEventSchema);
