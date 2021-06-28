const getSigner = (library, account) => {
  return library.getSigner(account).connectUnchecked();
};

export default getSigner;
