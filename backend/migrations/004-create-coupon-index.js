module.exports = {
  name: '004-create-coupon-index',
  async run(connection) {
    await connection.collection('coupons').createIndex(
      { code: 1 },
      { name: 'code_1', unique: true }
    );
  },
};
