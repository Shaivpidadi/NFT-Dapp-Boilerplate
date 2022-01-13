import React from "react";

import WalletButton from "../WalletButton/WalletButton";

import fortmaticLogo from "../../assets/images/fortmatic.png";

const Fortmatic = ({ title, onFortmaticClick }) => {
  return (
    <div>
      <WalletButton
        title={title}
        logo={fortmaticLogo}
        onConnectClick={onFortmaticClick}
      />
    </div>
  );
};

export default Fortmatic;
