require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const journalRoutes = require("./routes/journalRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/entries", journalRoutes);

app.get("/", (req, res) => {
  res.send("🚀 SmartAudit Backend Running");
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});