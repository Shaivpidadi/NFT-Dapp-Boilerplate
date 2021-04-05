import React, { useState, useEffect, useRef } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useWeb3React } from "@web3-react/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { injected } from "./utils/connectors";
import { useEagerConnect, useInactiveListener } from "./hooks";
import MetamaskButton from "./components/MetamaskButton/MetamaskButton";
import Dashboard from "./views/Dashboard/Dashboard";

import "./App.css";

const ONBOARD_TEXT = "Click to install MetaMask!";
const CONNECT_TEXT = "Connect Metamask";

const App = () => {
  const [metamaskButtonText, setMetamaskButtonText] = useState(ONBOARD_TEXT);
  const [activatingConnector, setActivatingConnector] = useState();

  const { account, error, active, activate, connector } = useWeb3React();
  const onboarding = useRef();

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

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
      // history.push("/dashboard");
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

  let mainContent = (
    <>
      <Route
        exact
        path="/"
        component={(props) => (
          <MetamaskButton
            {...props}
            title={metamaskButtonText}
            onConnectWithMetamaskClick={onConnectWithMetamaskClick}
          />
        )}
      />
      {localStorage.getItem("userData") === null && <Redirect to="/" />}
    </>
  );

  if (active) {
    mainContent = (
      <>
        <Route
          path="/"
          component={React.lazy(() =>
            import("./views/MainContainer/MainContainer")
          )}
        />
      </>
    );
  }

  return (
    <React.Suspense fallback={<Dashboard />}>
      <BrowserRouter>
        <Switch>{mainContent}</Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
