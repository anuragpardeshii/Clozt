require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../Models/User");
const getMongoUri = require("../config/mongoUri");

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  if (!email) {
    throw new Error("ADMIN_EMAIL is required");
  }
  await mongoose.connect(getMongoUri());
  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $set: { role: "admin" } },
      { new: true, collation: { locale: "en", strength: 2 } }
    );
    if (!user) {
      throw new Error(`No user found for ${email}`);
    }
    console.log(`Admin access granted to ${email}`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
