const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const TrafficEvent = require('../Models/TrafficEvent');
const isAdminLoggedIn = require('../Middleware/isAdminLoggedIn');

const router = express.Router();

router.post('/visit', async (req, res) => {
  const { sessionId, path } = req.body || {};
  if (typeof sessionId !== 'string' || !/^[a-f0-9-]{36}$/.test(sessionId) || typeof path !== 'string' || !path.startsWith('/') || path.length > 200) {
    return res.status(400).json({ message: 'Invalid visit' });
  }
  try {
    let userId;
    try {
      const token = req.cookies.userToken;
      if (token) userId = jwt.verify(token, process.env.JWT_SECRET).userId;
    } catch (_) { userId = undefined; }
    if (userId) {
      const user = await User.findById(userId).select('role').lean();
      if (user?.role === 'admin') return res.sendStatus(204);
      if (user) await User.updateOne({ _id: userId }, { $set: { lastActiveAt: new Date() } });
      else userId = undefined;
    }
    await TrafficEvent.create({ kind: 'page_view', sessionId, path: path.split('?')[0], user: userId });
    return res.sendStatus(204);
  } catch (error) {
    console.error('Visit tracking error:', error);
    return res.status(500).json({ message: 'Could not record visit' });
  }
});

router.get('/admin/traffic', isAdminLoggedIn, async (_req, res) => {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400000);
    const activeSince = new Date(now.getTime() - 30 * 60000);
    const [daily, activeUsers, newSignUps, totalUsers, signIns] = await Promise.all([
      TrafficEvent.aggregate([
        { $match: { kind: 'page_view', createdAt: { $gte: sevenDaysAgo } } },
        { $group: { _id: { day: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, session: '$sessionId' }, views: { $sum: 1 } } },
        { $group: { _id: '$_id.day', views: { $sum: '$views' }, visitors: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      User.countDocuments({ role: 'customer', lastActiveAt: { $gte: activeSince } }),
      User.countDocuments({ role: 'customer', createdAt: { $gte: sevenDaysAgo } }),
      User.countDocuments({ role: 'customer' }),
      TrafficEvent.countDocuments({ kind: 'sign_in', createdAt: { $gte: sevenDaysAgo } }),
    ]);
    const days = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(now.getTime() - (6 - index) * 86400000).toISOString().slice(0, 10);
      const row = daily.find((entry) => entry._id === date);
      return { date, views: row?.views || 0, visitors: row?.visitors || 0 };
    });
    return res.json({ activeUsers, newSignUps, totalUsers, signIns, days });
  } catch (error) {
    console.error('Traffic analytics error:', error);
    return res.status(500).json({ message: 'Could not fetch traffic analytics' });
  }
});

module.exports = router;
