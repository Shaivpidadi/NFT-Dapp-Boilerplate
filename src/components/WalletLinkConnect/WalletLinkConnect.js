import React from "react";

import WalletButton from "../WalletButton/WalletButton";

import walletLinkSVG from "../../assets/images/coinbaseWalletIcon.svg";

const WalletLinkConnect = ({ onWalletLinkConnectClick }) => {
  return (
    <div>
      <WalletButton
        title="Open in Coinbase Wallet"
        logo={walletLinkSVG}
        onConnectClick={onWalletLinkConnectClick}
      />
    </div>
  );
};

export default WalletLinkConnect;
