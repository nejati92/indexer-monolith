import { Transaction } from "./db/transactions";
import { AlchemyApi } from "./node/alchemy";
export const handler = async (event: any): Promise<any> => {
  try {
    // Process messages in the event
    for (const record of event.Records) {
      const blockNumber = JSON.parse(
        JSON.parse(record.body).Message
      ).currentBlockNumber;

      const txs = await new AlchemyApi().getTransactionsInABlock(blockNumber);
      await new Transaction().insertTx(txs);
      return true;
    }
  } catch (e) {
    console.error("Error");
    console.error(e);
    throw e;
  }
};
