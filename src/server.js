require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

const port = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error("Failed to connect to database", error);
    process.exit(1);
  });

