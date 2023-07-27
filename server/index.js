const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/electionDB", {
  useNewUrlParser: true,
});

const electionSchema = new mongoose.Schema({
  contractAddress: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    name: String,
    walletAddress: String,
  },
  candidates: [{ walletAddress: String, name: string }],
  date: { type: Date, default: Date.now },
});

const election = mongoose.model("Election", electionSchema);

app
  .route("/")
  .get((req, res) => {})
  .post("/", (req, res) => {});

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
