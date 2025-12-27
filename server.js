require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const resourceRoutes = require("./routes/resourceRoutes");
const testRoute = require("./routes/testRoute");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* ===============================
   DATABASE
================================ */
connectDB();

/* ===============================
   MIDDLEWARES
================================ */
app.use(cors());
app.use(express.json());

/* ===============================
   API ROUTES
================================ */
app.use("/api/resource", resourceRoutes);
app.use("/api/test", testRoute);
app.use("/api/auth", authRoutes);

/* ===============================
   SERVE FRONTEND (PRODUCTION)
================================ */
const frontendPath = path.join(__dirname, "frontend/dist");

// Serve static files
app.use(express.static(frontendPath));

// React Router fallback (ONLY for non-API routes)
app.get("*", (req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ message: "API route not found" });
  }
  res.sendFile(path.join(frontendPath, "index.html"));
});

/* ===============================
   SERVER
================================ */
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
