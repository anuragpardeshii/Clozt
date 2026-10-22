function getMongoUri() {
  if (process.env.MONGO_URI) return process.env.MONGO_URI;

  const username = process.env.MONGO_APP_USER;
  const password = process.env.MONGO_APP_PASSWORD;

  if (username || password) {
    if (!username || !password) {
      throw new Error('MONGO_APP_USER and MONGO_APP_PASSWORD are required together');
    }
    const host = process.env.MONGO_HOST || 'mongo';
    const database = process.env.MONGO_DB || 'clozt';
    return `mongodb://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${host}:27017/${encodeURIComponent(database)}?authSource=${encodeURIComponent(database)}`;
  }

  throw new Error('MONGO_URI or MongoDB application credentials are required');
}

module.exports = getMongoUri;
