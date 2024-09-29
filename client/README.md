# Crowdfunding DApp Frontend

 This directory contains the frontend for the Crowdfunding DApp built with React and Vite.

## Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port specified by Vite).

## Project Structure

- `src/`: Contains the source code for the React application 
  - `abi/`: ABI files for interacting with smart contracts
  - `assets/`: Static assets like images
  - `components/`: Reusable React components
  - `constants/`: Constant values used throughout the app
  - `context/`: React context for state management
  - `pages/`: Individual page components
  - `utils/`: Utility functions
- `public/`: Public assets
- `index.html`: Entry HTML file
- `vite.config.ts`: Vite configuration file

## Available Scripts

- `pnpm dev`: Starts the development server
- `pnpm build`: Builds the app for production
- `pnpm preview`: Previews the built app

## Connecting to Smart Contracts

Update the contract address in `src/context/index.jsx` after deploying your smart contract.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.