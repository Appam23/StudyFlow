require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const assignmentRoutes = require("./routes/assignmentRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use("/api/assignments", assignmentRoutes);


app.get("/", (req, res) => {
  res.send("StudyFlow server is running");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });