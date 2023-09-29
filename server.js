const express = require("express");
const mongoose = require("mongoose");
const path = require("path")


require("dotenv").config();

const Program = require("./models/programSchema");

const app = express();
const cors = require("cors");

const mongodburi = process.env.MONGOACCESSKEY;
const jwtkey = process.env.JWTHASHKEY;

// Enable CORS
app.use(cors());
// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "client", "build")))


// Connect to MongoDB
mongoose.connect(mongodburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.post("/api/add-program", async (req, res) => {
    const {
      name,
      organization,
      field,
      eligibility,
      type,
      cost,
      location,
      virtual,
      startDate,
      endDate,
      website,
      applicationDeadline,
      description,
    } = req.body;
  
    const newProgram = new Program({
      name,
      organization,
      field,
      eligibility,
      type,
      cost,
      location,
      virtual,
      startDate,
      endDate,
      website,
      applicationDeadline,
      description,
    });
  
    try {
        await newProgram.save();
        res.status(200).json({ message: "Successfully added new program." });
      } catch (err) {
        res.status(500).json({ message: "Failed to add new program.", error: err });
      }
  });
  

// Start server
const port = process.env.PORT || 3001;
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
