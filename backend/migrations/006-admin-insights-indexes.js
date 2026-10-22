module.exports = {
  name: '006-admin-insights-indexes',
  async run(connection) {
    const users = connection.collection('users');
    const orders = connection.collection('orders');
    const traffic = connection.collection('trafficevents');
    await Promise.all([
      users.createIndex({ role: 1, createdAt: -1 }),
      users.createIndex({ role: 1, lastActiveAt: -1 }),
      orders.createIndex({ status: 1, createdAt: -1 }),
      traffic.createIndex({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 180 }),
      traffic.createIndex({ kind: 1, createdAt: -1 }),
      traffic.createIndex({ sessionId: 1, createdAt: -1 }),
    ]);
  },
};
