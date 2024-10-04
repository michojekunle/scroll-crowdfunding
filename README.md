# Crowdfunding DApp on Scroll Sepolia

This project is a decentralized crowdfunding application built on the Scroll Sepolia testnet. It allows users to create and contribute to crowdfunding campaigns using cryptocurrency.

Deployed Smart contract on Scroll Sepolia Testnet: [https://sepolia.scrollscan.com/address/0x86C56e1a7fCe47701f228f65F47143e219c7d829#code](https://sepolia.scrollscan.com/address/0x86C56e1a7fCe47701f228f65F47143e219c7d829#code)

Live Link to interact: [https://scroll-crowdfunding.vercel.app/](https://scroll-crowdfunding.vercel.app/)

## Technologies Used

- Frontend: React.js with Vite
- Smart Contracts: Solidity
- Development Environment: Hardhat
- Network: Scroll Sepolia
- RPC Provider: Alchemy <strong>(Alchemy was used as an RPC provider in our hardhat.config.ts file as a provider to interact with the scroll sepolia testnet network)</strong>
- Deployment: Hardhat Ignition

## Project Structure

The project is divided into two main directories:

1. `client`: Contains the frontend React application
2. `hardhat-contracts`: Contains the smart contract and related files

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- pnpm or npm 
- Git

### Clone the Repository

```bash
git clone https://github.com/michojekunle/scroll-crowdfunding.git
cd scroll-crowdfunding
```

### Frontend Setup (client directory)

For detailed instructions on setting up the frontend, please refer to the [Client README](./client/README.md).

### Smart Contract Setup (hardhat-contracts directory)

For detailed instructions on setting up and deploying the smart contracts, please refer to the [Hardhat Contracts README](./hardhat-contracts/README.md).

## Environment Variables

Create a `.env` file in the `hardhat-contracts` directory with the following variables:

```
ALCHEMY_SCROLL_RPC_URL=your_alchemy_scroll_rpc_url
WALLET_KEY=your_wallet_private_key
SCROLLSCAN_API_KEY=your_scrollscan_api_key
```
   - To get your Alchemy scroll rpc url you have to sign up on [Alchemy](https://auth.alchemy.com/#:~:text=Log%20in.%20Don't%20have%20an%20account?%20Signup.) and head to your dashboard [https://dashboard.alchemy.com/](https://dashboard.alchemy.com/) to get your alchemy scroll rpc url
   - To get your ScrollScan Api key you also have to sign up on [scrollscan](https://scrollscan.com/register) and then head to your dashboard to get your api key [https://scrollscan.com/myapikey](https://scrollscan.com/myapikey)

## Deploying Smart Contracts

To deploy the smart contracts to Scroll Sepolia:

```bash
cd hardhat-contracts
npx hardhat ignition deploy ignition/modules/Crowdfunding.ts --network scroll_sepolia
```

To verify the contract on ScrollScan:

```bash
npx hardhat verify YOUR_CONTRACT_ADDRESS --network scroll_sepolia
```

Replace `YOUR_CONTRACT_ADDRESS` with the address of your deployed contract.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
