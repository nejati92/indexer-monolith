import { Transaction } from "./db/TransactionsModel";
import { Blocks } from "./db/BlocksModel";

export const run = async () => {
  await new Transaction().syncTable();
  await new Blocks().syncTable();
};

run()
  .then()
  .catch((e) => {
    console.error(e);
  });
