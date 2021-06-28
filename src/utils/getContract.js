import { isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { AddressZero } from "@ethersproject/constants";

import getProviderOrSigner from "./getProviderOrSigner";

// account is optional
export const getContract = (address, ABI, library, account = "") => {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
};
