const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

// env config
dotenv.config();

// Router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
// MONGODB CONNECTION
connectDB();
// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Port
const PORT = process.env.PORT;

// listen
app.listen(PORT, () => {
  console.log(
    `Sever running on ${process.env.DEV_MODE} mode port ${PORT}`.bgCyan.white
  );
});
