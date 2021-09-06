import React from "react";

import "./WalletButton.css";

const WalletButton = ({ title, logo, onConnectClick }) => {
  return (
    <div className="loginCard" onClick={onConnectClick}>
      <div>{title}</div>
      <div>
        <img src={logo} width="30" height="auto" alt="logo" />
      </div>
    </div>
  );
};

export default WalletButton;
