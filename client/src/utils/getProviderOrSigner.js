import getSigner from "./getSigner";

const getProviderOrSigner = (library, account = "") => {
  return account ? getSigner(library, account) : library;
};

export default getProviderOrSigner;
