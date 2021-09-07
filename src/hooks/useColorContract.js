import useContract from "./useContract";

import Color from "../contracts/Color.json";

const useColorContract = () =>
  useContract(process.env.REACT_APP_COLOR_ADDRESS, Color.abi, true);

export default useColorContract;
