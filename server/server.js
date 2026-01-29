import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { initAuth } from "./src/lib/auth.js";
import authRoutes from "./src/routes/auth.routes.js";

dotenv.config();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;

// CORS Configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposedHeaders: ["Set-Cookie"],
  }),
);
// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  // Log when response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusColor =
      res.statusCode >= 500 ? "🔴" : res.statusCode >= 400 ? "🟡" : "🟢";
    const path = req.originalUrl || req.url;
    console.log(
      `${statusColor} ${res.statusCode} ${req.method} ${path} - ${duration}ms`,
    );
  });

  next();
});

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("PrintEmporium Backend is running");
});

// Handle unexpected POST to root (likely from browser extensions or tools)
app.post("/", (req, res) => {
  res.status(200).json({ message: "PrintEmporium API - Use /api/* endpoints" });
});
// Connect and start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "jcss",
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);

    // Initialize Better Auth AFTER database connection
    const auth = initAuth();
    console.log("✅ Better Auth initialized");

    // Better Auth API Handler - MUST register routes before listen()
    app.use("/api/auth", toNodeHandler(auth));
    // Mount express json middleware AFTER Better Auth handler
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ limit: "10mb", extended: true }));
    // Custom Auth Routes (for any additional custom endpoints - these will override Better Auth if same path)
    app.use("/api/auth", authRoutes);

    // Start listening AFTER routes are registered
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`📍 API: http://localhost:${PORT}`);
      console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
      console.log(`\n✨ Ready to accept requests!\n`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
