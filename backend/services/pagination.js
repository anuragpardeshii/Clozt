module.exports = function pagination(query) {
  const page = Math.max(1, Math.min(100000, Number.parseInt(query.page, 10) || 1));
  const limit = Math.max(1, Math.min(50, Number.parseInt(query.limit, 10) || 12));
  return { page, limit, skip: (page - 1) * limit };
};
