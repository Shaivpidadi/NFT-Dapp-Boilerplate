import React from "react";

import WalletButton from "../WalletButton/WalletButton";

import metamaskLogo from "../../assets/images/metamask.png";

const MetamaskButton = ({ title, onMetamaskClick }) => {
  return (
    <div>
      <WalletButton
        title={title}
        logo={metamaskLogo}
        onConnectClick={onMetamaskClick}
      />
    </div>
  );
};

export default MetamaskButton;
