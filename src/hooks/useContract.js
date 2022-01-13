import { useMemo } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import Fortmatic from "fortmatic";

const useContract = (address = undefined, ABI, withSignerIfPossible = true) => {
  const { library, connector } = useWeb3React();

  const { ethereum } = window;
  if (connector?.fortmatic) {
    const fm = new Fortmatic(
      process.env.REACT_APP_FORTMATIC_API_KEY,
      process.env.REACT_APP_FORTMATIC_CHAIN_NAME
    );
    window.web3 = new Web3(fm.getProvider());
  } else {
    window.web3 = new Web3(ethereum);
  }

  return useMemo(() => {
    if (!address || !ABI || !library) return null;
    try {
      const contractInstance = new window.web3.eth.Contract(ABI, address);
      return contractInstance;
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [library]);
};

export default useContract;
