import { Transaction } from "./db/transactions";
import { Context, APIGatewayEvent } from "aws-lambda";
const Web3 = require("web3");
export const handler = async (
  event: APIGatewayEvent,
  context: Context
): Promise<any> => {
  try {
    console.log(`Event: ${JSON.stringify(event, null, 2)}`);
    console.log(`Context: ${JSON.stringify(context, null, 2)}`);
    const address = (event.multiValueQueryStringParameters as any)
      .address as string[];
    const limit = parseInt(
      (event.queryStringParameters as any)?.limit || "10",
      10
    );
    const offset = parseInt(
      (event.queryStringParameters as any)?.offset || "10",
      0
    );
    if (address.length < 0) {
      throw new Error("Invalid Address");
    }

    const adds = address.map((a) => {
      if (!Web3.utils.isAddress(a)) {
        throw new Error("Invalid Address");
      }
      return Buffer.from(a.substring(2), "hex").toString("base64");
    });
    const response = await new Transaction().getTransactions(
      adds,
      limit,
      offset
    );
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (e) {
    console.error(e);
    if ((e as Error).message === "Invalid Address") {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid Address" }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
