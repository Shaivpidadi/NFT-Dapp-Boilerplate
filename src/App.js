import React from "react";
import { useWeb3React } from "@web3-react/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import Loader from "./components/Loader/Loader";
import WrongNetworkModal from "./components/WrongNetworkModal";

const App = () => {
  const { active, chainId } = useWeb3React();

  let mainContent = (
    <>
      <Route
        exact
        path="/"
        component={React.lazy(() => import("./views/Login/Login"))}
      />
      {localStorage.getItem("userData") === null && <Redirect to="/" />}
    </>
  );

  if (active) {
    localStorage.setItem("shouldEagerConnect", true);

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

  const onChangeNetworkClick = async () => {
    // Metamask adds Ropsten chain by default, so no need to check wether chain is added or not
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x3" }],
    });
  };

  return (
    <React.Suspense fallback={<Loader />}>
      <WrongNetworkModal
        show={chainId !== 3 && active}
        onChangeNetworkClick={onChangeNetworkClick}
      />
      <BrowserRouter>
        <Switch>{mainContent}</Switch>
      </BrowserRouter>
    </React.Suspense>
  );
};

export default App;
