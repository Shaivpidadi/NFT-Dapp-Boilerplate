import React, { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";

import { injected } from "./utils/connectors";

import metamaskLogo from "./assets/images/metamask.png";
import "./App.css";

const ONBOARD_TEXT = "Click to install MetaMask!";
const CONNECT_TEXT = "Connect Metamask";

const App = () => {
  const [metamaskButtonText, setMetamaskButtonText] = useState(ONBOARD_TEXT);
  const [activatingConnector, setActivatingConnector] = useState();

  const { account, error, active, activate, connector } = useWeb3React();
  const onboarding = useRef();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // For Metamask OnBoarding
  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account && account.length > 0) {
        onboarding.current.stopOnboarding();
      } else {
        setMetamaskButtonText(CONNECT_TEXT);
      }
    }
  }, [account]);

  useEffect(() => {
    if (account && active && !error) {
      // history.push("/claim");
      alert("active");
    }
  }, [account, active, error]);

  const onConnectWithMetamaskClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setActivatingConnector(injected);
      activate(injected);
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <div className="App">
      <div className="login-button">
        <div className="my-card" onClick={() => onConnectWithMetamaskClick()}>
          <p>{metamaskButtonText}</p>
          <div>
            <img src={metamaskLogo} width="30" height="auto" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
