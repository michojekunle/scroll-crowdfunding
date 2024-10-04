import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ProposalsModule = buildModule("ProposalsModule", (m) => {

  const Proposals = m.contract("ProposalContract");

  return { Proposals };
});

export default ProposalsModule;
