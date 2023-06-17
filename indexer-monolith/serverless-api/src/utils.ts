const Web3 = require("web3");
export const convertHexToBase64 = (value: string) => {
  return Buffer.from(value.substring(2), "hex").toString("base64");
};

export const convertHexToNumberInEth = (value: string) => {
  return Web3.utils.fromWei(value);
};
export const convertFromBase64toHex = (value: string) => {
  return "0x" + Buffer.from(value, "base64").toString("hex");
};
