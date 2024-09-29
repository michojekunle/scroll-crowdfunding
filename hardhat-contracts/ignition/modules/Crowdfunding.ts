import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const CrowdfundingModule = buildModule("CrowdfundingModule", (m) => {

  const Crowdfunding = m.contract("Crowdfunding");

  return { Crowdfunding };
});

export default CrowdfundingModule;
