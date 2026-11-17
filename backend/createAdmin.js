import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Admin from "./src/models/Admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI
    );

    console.log("MongoDB connected.");

    const existingAdmin = await Admin.findOne({
      email: "admin@sufiyan.dev",
    });

    if (existingAdmin) {
      console.log("");
      console.log("⚠️ Admin already exists.");
      console.log("");

      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword =
      await bcrypt.hash(
        "CHANGE_THIS_PASSWORD",
        12
      );

    await Admin.create({
      name: "Sufiyan Khan",
      email: "admin@sufiyan.dev",
      password: hashedPassword,
      role: "admin",
    });

    console.log("");
    console.log("==========================================");
    console.log("✅ ADMIN CREATED SUCCESSFULLY");
    console.log("==========================================");
    console.log("Email    : admin@sufiyan.dev");
    console.log("Password : Sufiyan@100");
    console.log("==========================================");
    console.log("");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("❌ Failed to create admin");
    console.error(error);
    console.error("");

    process.exit(1);
  }
};

createAdmin();