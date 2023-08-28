import mongoose from "mongoose";
import cors from "cors";
// import { ThirdwebAuth } from "@thirdweb-dev/auth/express";
// import { PrivateKeyWallet } from "@thirdweb-dev/auth/evm";
import express from "express";
import { ethers } from "ethers";
// import dotenv from "dotenv";
// dotenv.config({ silent: process.env.NODE_ENV === "production" });
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/electionDB", {
  useNewUrlParser: true,
});

// userSchema -----------
const userSchema = new mongoose.Schema({
  publicAddress: {
    type: String,
    required: true,
    unique: true,
  },
  payload: {
    type: String,
  },
});
// electionSchema ------------
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

// collections -----------
const election = mongoose.model("Election", electionSchema);
const user = mongoose.model("User", userSchema);

// app routes ---------------------------

app.get("/user/:userAddress/nonce/:nonce/chain/:chainId", async (req, res) => {
  console.log(req.params);
  const { userAddress, nonce, chainId } = req.params;
  const msg = `
        message:
        Sign in the online voting system 
        
        Uri:
        https://localhost:3000/
        
        version:
        1
        
        chainId:
        ${chainId}
        
        nonce:
        ${nonce}
        
        issued At:
        ${new Date()}

      `;
  try {
    // console.log(msg);
    res.send(msg);
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  const { userAddress, txnHash, message } = req.body;
  console.log(userAddress, txnHash, message);
  try {
    // const publicKey = ethers.utils.recoverPublicKey(txnHash);
    const isVerified = ethers.utils.verifyMessage(message, txnHash);
    console.log(isVerified);
    res.send(isVerified);
    if (
      (await user.findOne({ publicAddress: userAddress })) === undefined ||
      (await user.findOne({ publicAddress: userAddress })) === null
    ) {
      const signer = new user({
        publicAddress: userAddress,
        payload: message,
      });
      await signer.save();
      console.log("user created ", userAddress);
    } else {
      await user.updateOne(
        { publicAddress: userAddress },
        { payload: message }
      );
      console.log("user updated", userAddress);
    }
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const { address } = req.body;
  const person = new user({
    publicAddress: address,
  });

  await person.save();
  console.log("person saved successfully");
  res.send(`${address} saved successfully`);
});

// routes for  getting the election data ------
app.get("/joinElection", async (req, res) => {
  try {
    const data = await election.find({ end: { $gte: Date.now() / 1000 } });
    console.log("requested live election data : ", data);
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

// routes for creating the election-----
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
        admin: { name: adminName, walletAddress: adminAddress },
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
