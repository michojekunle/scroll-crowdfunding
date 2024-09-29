import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import { CrowdfundingProvider } from "./context";
import FloatingButton from "./components/FloatingButton";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <CrowdfundingProvider>
      <App />
      <FloatingButton/>
    </CrowdfundingProvider>
  </Router>
);
