const adminDatabase = db.getSiblingDB('admin');
const databaseName = process.env.MONGO_DB || 'clozt';
const applicationDatabase = db.getSiblingDB(databaseName);
const rootUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
const rootPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;
const applicationUsername = process.env.MONGO_APP_USER;
const applicationPassword = process.env.MONGO_APP_PASSWORD;

if (!rootUsername || !rootPassword || !applicationUsername || !applicationPassword) {
  throw new Error('MongoDB usernames and passwords are required');
}
if (databaseName === 'admin') {
  throw new Error('MONGO_DB cannot be admin');
}
if (process.env.MONGO_BOOTSTRAP_EXISTING === '1' && adminDatabase.getCollection('system.users').findOne()) {
  throw new Error('Database users already exist; review them before enabling authentication');
}

if (!applicationDatabase.getUser(applicationUsername)) {
  applicationDatabase.createUser({
    user: applicationUsername,
    pwd: applicationPassword,
    roles: [{ role: 'readWrite', db: databaseName }],
  });
  print('Created application database user');
}

if (!adminDatabase.getUser(rootUsername)) {
  adminDatabase.createUser({
    user: rootUsername,
    pwd: rootPassword,
    roles: [{ role: 'root', db: 'admin' }],
  });
  print('Created database administrator');
}
