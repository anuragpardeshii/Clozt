const sameSite = process.env.COOKIE_SAME_SITE || "lax";
const domain = process.env.COOKIE_DOMAIN?.trim();

module.exports = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production" || sameSite === "none",
  sameSite,
  ...(domain ? { domain } : {}),
};
