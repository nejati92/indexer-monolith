import { Blocks } from "./adapters/db/BlocksModel";
import { AlchemyApi } from "./adapters/node/alchemy";
import { SNSTopic } from "./adapters/sns/sns";
import { sleep } from "./utils";

export const run = async () => {
  let currentBlockNumber = await new Blocks().getBlockNumber();
  let actualBlockNumber = await new AlchemyApi().getCurrentBlock();
  while (currentBlockNumber <= actualBlockNumber) {
    actualBlockNumber = await new AlchemyApi().getCurrentBlock();
    if (currentBlockNumber < actualBlockNumber) {
      currentBlockNumber++;
      await Promise.allSettled([
        new Blocks().createBlock(currentBlockNumber),
        new SNSTopic().sendMessage(JSON.stringify({ currentBlockNumber })),
      ]);
    }
    if (currentBlockNumber === actualBlockNumber) {
      await sleep(60000);
    }
    console.log(currentBlockNumber);
    // console.log(actualBlockNumber);
    // Commenting to save on Cloudwatch logs cost
    // console.log(`currentBlockNumber: ${currentBlockNumber}`);
    // console.log(`actualBlockNumber: ${actualBlockNumber}`);
  }
};

run()
  .then()
  .catch((e) => {
    console.error(e);
  });
