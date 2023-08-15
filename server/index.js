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
  candidates: [{ name: String, partyName: String, slogan: String }],
  electionTitle: {
    type: String,
    required: true,
  },
  organizationTitle: {
    type: String,
    required: true,
  },
  date: { type: Date, default: Date.now() },
  end: {
    type: Number,
  },
});

const election = mongoose.model("Election", electionSchema);

app.get("/ongoing election", async (req, res) => {
  try {
    const data = await election.find({ end: { $gte: Date.now() / 1000 } });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.get("/electionList", async (req, res) => {
  try {
    const data = await election.find({ end: { $lt: Date.now() / 1000 } });
    console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app
  .route("/createElection")
  .post(async (req, res) => {
    console.log("this is the data : ", req.body);
    const {
      contractAddress,
      adminName,
      adminAddress,
      electionTitle,
      organizationTitle,
    } = req.body;
    try {
      const elect = new election({
        contractAddress: contractAddress,
        admin: { adminName, adminAddress },
        electionTitle: electionTitle,
        organizationTitle: organizationTitle,
      });
      await elect.save();
      console.log("contract saved successfully");
    } catch (error) {
      console.log(error);
    }
    res.send("contract saved successfully");
  })
  .put(async (req, res) => {
    console.log("this is the updated data request", req.body);
    const { electionAddress, candidates, endTime } = req.body;
    await election.updateOne(
      { contractAddress: electionAddress },
      { $set: { candidates: candidates, end: endTime } }
    );
    res.send("updated");
  });

app.listen("8080", (req, res) => {
  console.log("listening on port 8080");
});
