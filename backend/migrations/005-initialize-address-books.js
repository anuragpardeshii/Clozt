module.exports = {
  name: '005-initialize-address-books',
  async run(connection) {
    await connection.collection('users').updateMany(
      { addresses: { $exists: false } },
      { $set: { addresses: [] } }
    );
  },
};
