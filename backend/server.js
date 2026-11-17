import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import contactRoutes from "./src/routes/contactRoutes.js";
import adminRoutes from "./src/routes/adminRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

/* =========================================================
   BASIC CONFIG
========================================================= */

if (!JWT_SECRET) {
  console.error("");
  console.error("❌ JWT_SECRET is missing in .env");
  console.error("");
  process.exit(1);
}

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

/* =========================================================
   PUBLIC ROUTES
========================================================= */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Sufiyan Portfolio API is running",
    database:
      mongoose.connection.readyState === 1
        ? "connected"
        : "disconnected",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Sufiyan Portfolio API",
  });
});

/* =========================================================
   API ROUTES
========================================================= */

app.use("/api/contact", contactRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/admin", adminRoutes);

/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((err, req, res, next) => {
  console.error("");
  console.error("==========================================");
  console.error("❌ SERVER ERROR");
  console.error("==========================================");
  console.error(err);
  console.error("");

  res.status(err.status || 500).json({
    success: false,
    message:
      err.message || "Internal Server Error",
  });
});

/* =========================================================
   START SERVER
========================================================= */

const startServer = async () => {
  try {
    if (!MONGODB_URI) {
      throw new Error(
        "MONGODB_URI is missing in .env"
      );
    }

    await mongoose.connect(MONGODB_URI);

    console.log("");
    console.log("==========================================");
    console.log("✅ MongoDB connected successfully");
    console.log("==========================================");

    app.listen(PORT, () => {
      console.log("");
      console.log("🚀 SUFIYAN PORTFOLIO API");
      console.log("------------------------------------------");

      console.log(
        `Server : http://localhost:${PORT}`
      );

      console.log(
        `Health : http://localhost:${PORT}/api/health`
      );

      console.log(
        `Login  : POST http://localhost:${PORT}/api/auth/login`
      );

      console.log(
        `Admin  : GET http://localhost:${PORT}/api/admin/contacts`
      );

      console.log(
        `Stats  : GET http://localhost:${PORT}/api/admin/contacts/stats`
      );

      console.log(
        `Status : PATCH http://localhost:${PORT}/api/admin/contacts/:id/status`
      );

      console.log("------------------------------------------");
      console.log("🔐 Admin authentication enabled");
      console.log("Waiting for requests...");
      console.log("");
    });
  } catch (error) {
    console.error("");
    console.error("==========================================");
    console.error("❌ FAILED TO START SERVER");
    console.error("==========================================");
    console.error(error.message);
    console.error("");

    process.exit(1);
  }
};

startServer();