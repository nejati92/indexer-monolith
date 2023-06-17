import { Network, Alchemy } from "alchemy-sdk";
import { convertHexToBase64, convertHexToNumberInEth } from "../utils";

export class AlchemyApi {
  private alchemy;
  constructor() {
    this.alchemy = new Alchemy({
      apiKey: process.env.API_KEY,
      network: Network.ETH_GOERLI,
    });
  }

  async getCurrentBlock() {
    return this.alchemy.core.getBlockNumber();
  }

  async getTransactionsInABlock(blockNumber: number) {
    const block = await this.alchemy.core.getBlockWithTransactions(blockNumber);
    return block.transactions.map((tx) => {
      const t = {
        txHash: convertHexToBase64(tx.hash),
        blockHash: tx.blockHash ? convertHexToBase64(tx.blockHash) : "",
        blockNumber: tx.blockNumber,
        from: convertHexToBase64(tx.from),
        to: convertHexToBase64(tx.to || "0x"),
        value: convertHexToNumberInEth(tx.value._hex),
        gasLimit: BigInt(tx.gasLimit._hex),
        gasPrice: tx.gasPrice ? convertHexToNumberInEth(tx.gasPrice._hex) : 0,
        data: convertHexToBase64(tx.data),
        nonce: tx.nonce,
        network: Network.ETH_GOERLI,
      };
      return t;
    });
  }
}
