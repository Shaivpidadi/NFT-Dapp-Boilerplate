import React from "react";

import metamaskLogo from "../../assets/images/metamask.png";
import "./MetamaskButton.css";

const MetamaskButton = ({ onConnectWithMetamaskClick, title }) => {
  return (
    <div className="loginCard" onClick={onConnectWithMetamaskClick}>
      <p>{title}</p>
      <div>
        <img src={metamaskLogo} width="30" height="auto" alt="logo" />
      </div>
    </div>
  );
};

export default MetamaskButton;
