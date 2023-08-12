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
  candidates: [{ name: string, partyName: string, slogan: string }],
  electionTitle: {
    type: string,
    required: true,
  },
  organizationTitle: {
    type: string,
    required: true,
  },
  date: { type: Date, default: Date.now() },
  end: {
    type: Number,
    required: true,
  },
});

const election = mongoose.model("Election", electionSchema);

app.get("/ongoing election", async (req, res) => {
  try {
    const data = await election.find({ end: { $gte: Date.now() } });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/createElection", async (req, res) => {
  console.log("this is the data : ", req.body);
  const {
    contractAddress,
    candidates,
    adminName,
    adminAddress,
    electionTitle,
    organizationTitle,
    EndTime,
  } = req.body;

  const elect = new election({
    contractAddress,
    admin: { adminName, adminAddress },
    candidates: candidates,
    electionTitle,
    organizationTitle,
    EndTime,
  });
  await elect.save();
  res.send("contract saved successfully : ", contractAddress);
});

app.listen("3000", (req, res) => {
  console.log("listening on port 3000");
});
