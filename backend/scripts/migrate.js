require('dotenv').config();
const mongoose = require('mongoose');
const getMongoUri = require('../config/mongoUri');
const migrations = [
  require('../migrations/001-unify-admin-users'),
  require('../migrations/002-backfill-order-items'),
  require('../migrations/003-create-review-index'),
  require('../migrations/004-create-coupon-index'),
  require('../migrations/005-initialize-address-books'),
  require('../migrations/006-admin-insights-indexes'),
];

async function main() {
  await mongoose.connect(getMongoUri());
  try {
    const ledger = mongoose.connection.collection('app_migrations');
    for (const migration of migrations) {
      if (await ledger.findOne({ name: migration.name })) continue;
      await migration.run(mongoose.connection);
      await ledger.insertOne({ name: migration.name, appliedAt: new Date() });
      console.log(`Applied ${migration.name}`);
    }
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
