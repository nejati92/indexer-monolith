import { Network, Alchemy } from "alchemy-sdk";

export class AlchemyApi {
  private alchemy;
  constructor() {
    this.alchemy = new Alchemy({
      apiKey: "uZaCrnLBDS8P2lvmrcVmDfyo05CZ-4Di",
      network: Network.ETH_GOERLI,
    });
  }

  async getCurrentBlock() {
    return this.alchemy.core.getBlockNumber();
  }
}
