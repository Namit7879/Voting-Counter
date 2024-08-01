import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../declarations/my_voting_project";

const agent = new HttpAgent();
export const votingBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId: "your-canister-id"
});

