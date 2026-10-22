const User = require('../Models/User');

module.exports = {
  name: '001-unify-admin-users',
  async run(connection) {
    await User.updateMany({ role: { $exists: false } }, { $set: { role: 'customer' } });
    const legacyAdmins = await connection.collection('admins').find().toArray();
    const conflicts = [];
    let created = 0;

    for (const admin of legacyAdmins) {
      const email = typeof admin.email === 'string' ? admin.email.trim().toLowerCase() : '';
      if (!email || !admin.password) {
        conflicts.push(String(admin._id));
        continue;
      }
      const existingUser = await User.findOne({ email }).collation({ locale: 'en', strength: 2 });
      if (existingUser) {
        if (existingUser.role !== 'admin') conflicts.push(email);
        continue;
      }
      await User.create({
        username: admin.name || admin.username || email.split('@')[0],
        email,
        password: admin.password,
        role: 'admin',
      });
      created += 1;
    }

    console.log(`Migrated ${created} legacy admin account(s).`);
    if (conflicts.length) {
      throw new Error(`Manual review required for: ${conflicts.join(', ')}`);
    }
  },
};
