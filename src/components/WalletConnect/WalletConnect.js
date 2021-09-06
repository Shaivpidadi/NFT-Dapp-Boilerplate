import React from "react";

import WalletButton from "../WalletButton/WalletButton";
import WallectConnectLogo from "../../assets/images/wallet-Connect.png";

const WalletConnect = ({ onWalletConnectClick }) => {
  return (
    <WalletButton
      title="Wallet Connect"
      logo={WallectConnectLogo}
      onConnectClick={onWalletConnectClick}
    />
  );
};

export default WalletConnect;
