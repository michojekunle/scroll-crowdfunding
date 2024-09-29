import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers';

// ABI of your contract
import CrowdfundingABI from '../abi/CrowdfundingABI.json';

// Scroll-Sepolia testnet details
const SCROLL_SEPOLIA_CHAIN_ID = 534351;
const SCROLL_SEPOLIA_RPC_URL = 'https://sepolia-rpc.scroll.io/';

// Contract address on Scroll-Sepolia
const CONTRACT_ADDRESS = '0x86C56e1a7fCe47701f228f65F47143e219c7d829';

const CrowdfundingContext = createContext();

export const useCrowdfunding = () => useContext(CrowdfundingContext);

export const CrowdfundingProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [contract, setContract] = useState(null);

  const connect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAddress(address);

        const { chainId } = await provider.getNetwork();
        if (chainId !== SCROLL_SEPOLIA_CHAIN_ID) {
          alert('Please switch to the Scroll-Sepolia testnet');
          return;
        }

        const crowdfundingContract = new ethers.Contract(CONTRACT_ADDRESS, CrowdfundingABI, signer);
        setContract(crowdfundingContract);
      } catch (error) {
        console.error('Failed to connect to wallet or contract', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const publishCampaign = async (form) => {
    try {
      const data = await contract.createCampaign(
        address, // owner
        form.title,
        form.description,
        form.target,
        new Date(form.deadline).getTime(),
        form.image
      );

      await data.wait();
    } catch (error) {
      console.error('Error creating campaign:', error);
    }
  };

  const getCampaigns = async () => {
    try {
      const campaigns = await contract.getCampaigns();
      const parsedCampaigns = campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target.toString()),
        deadline: campaign.deadline.toNumber(),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
        image: campaign.image,
        pId: i
      }));

      return parsedCampaigns;
    } catch (error) {
      console.error('Error getting campaigns:', error);
    }
  };

  const getUserCampaigns = async () => {
    try {
      const allCampaigns = await getCampaigns();
      const filteredCampaigns = allCampaigns.filter((campaign) =>
        campaign.owner.toLowerCase() === address.toLowerCase()
      );

      return filteredCampaigns;
    } catch (error) {
      console.error('Error getting user campaigns:', error);
    }
  };

  const donate = async (pId, amount) => {
    try {
      const data = await contract.donateToCampaign(pId, {
        value: ethers.utils.parseEther(amount)
      });

      await data.wait();
      return data;
    } catch (error) {
      console.error('Error donating to campaign:', error);
    }
  };

  const getDonations = async (pId) => {
    try {
      const donations = await contract.getDonators(pId);
      const numberOfDonations = donations[0].length;

      const parsedDonations = [];

      for (let i = 0; i < numberOfDonations; i++) {
        parsedDonations.push({
          donator: donations[0][i],
          donation: ethers.utils.formatEther(donations[1][i].toString())
        });
      }

      return parsedDonations;
    } catch (error) {
      console.error('Error getting donations:', error);
    }
  };

  return (
    <CrowdfundingContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </CrowdfundingContext.Provider>
  );
};