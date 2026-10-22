module.exports = {
  name: '003-create-review-index',
  async run(connection) {
    await connection.collection('reviews').createIndex(
      { product: 1, user: 1 },
      { name: 'product_1_user_1', unique: true }
    );
  },
};
