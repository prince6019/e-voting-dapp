import { ethers } from "ethers";
import Election from "../artifacts/contracts/Election.sol/Election";

export default async function deploy({ signer }) {
  const factory = new ethers.ContractFactory(
    Election.abi,
    Election.bytecode,
    signer
  );
  return factory.deploy();
}
