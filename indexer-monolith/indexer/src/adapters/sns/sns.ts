import { SNS } from "aws-sdk";

export class SNSTopic {
  constructor() {}

  async sendMessage(message: string) {
    const params = {
      Message: message,
      TopicArn: process.env.TOPIC_ARN,
    };
    console.log(process.env.TOPIC_ARN);
    const response = await new SNS().publish(params).promise();
    return response.MessageId;
  }
}
