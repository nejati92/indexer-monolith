export const stripHexPrefix = (hex: string) => hex.substring(2);
export const converToBuffer = (hex: string) =>
  Buffer.from(stripHexPrefix(hex), "hex");
export const convertFromBufferToHex = (buffer: Buffer) =>
  "0x" + buffer.toString("hex");
export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
