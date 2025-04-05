const Admin = require("../models/admin");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const createAdmin = async (email = "admin", password = "password") => {
  await mongoose.connect(process.env.MONGO_URI);

  try {
    const admin = new Admin({ email, password });
    await admin.save();
    console.log("Admin created successfully:", email);
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    mongoose.disconnect();
  }
};

createAdmin();

// Usage: node -e 'require("./utils/createAdmin").createAdmin("admin@example.com", "password123")'
module.exports = createAdmin;
