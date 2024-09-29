# Crowdfunding Smart Contract

This directory contains the smart contracts for the Crowdfunding DApp and the Hardhat configuration for development and deployment.

## Setup

1. Navigate to the hardhat-contracts directory:

   ```bash
   cd hardhat-contracts
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:

   ```
   ALCHEMY_SCROLL_RPC_URL=your_alchemy_scroll_rpc_url
   WALLET_KEY=your_wallet_private_key
   SCROLLSCAN_API_KEY=your_scrollscan_api_key
   ```
   - To get your Alchemy scroll rpc url you have to sign up on [Alchemy](https://auth.alchemy.com/#:~:text=Log%20in.%20Don't%20have%20an%20account?%20Signup.) and head to your dashboard [https://dashboard.alchemy.com/](https://dashboard.alchemy.com/) to get your alchemy scroll rpc url
   - To get your ScrollScan Api key you also have to sign up on [scrollscan](https://scrollscan.com/register) and then head to your dashboard to get your api key [https://scrollscan.com/myapikey](https://scrollscan.com/myapikey)

## Smart Contract Structure

The main contract is `Crowdfunding.sol`, which allows users to create and contribute to crowdfunding campaigns.

## Deployment

To deploy the smart contract to Scroll Sepolia:

1. Make sure your `.env` file is set up correctly.

2. Run the deployment script:

   ```bash
   npx hardhat ignition deploy ignition/modules/Crowdfunding.ts --network scroll_sepolia
   ```

3. After deployment, verify the contract on ScrollScan:

   ```bash
   npx hardhat verify YOUR_CONTRACT_ADDRESS --network scroll_sepolia
   ```

   Replace `YOUR_CONTRACT_ADDRESS` with the address of your deployed contract.

## Hardhat Configuration

The `hardhat.config.ts` file is set up for deployment to Scroll Sepolia. It includes:

- Solidity version: 0.8.24
- Network configuration for Scroll Sepolia
- Etherscan (ScrollScan) configuration for contract verification

## Testing

To run tests:

```bash
npx hardhat test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
