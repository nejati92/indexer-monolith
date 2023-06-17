import * as cdk from "@aws-cdk/core";
import * as ecs from "@aws-cdk/aws-ecs";
import * as ecs_patterns from "@aws-cdk/aws-ecs-patterns";
import * as ec2 from "@aws-cdk/aws-ec2";
import * as ecr from "@aws-cdk/aws-ecr";
import * as sns from "@aws-cdk/aws-sns";
import * as snsSubscriptions from "@aws-cdk/aws-sns-subscriptions";
import * as iam from "@aws-cdk/aws-iam";
import * as sqs from "@aws-cdk/aws-sqs";
import * as lambda from "@aws-cdk/aws-lambda";
import { AnyPrincipal, Effect, ServicePrincipal } from "@aws-cdk/aws-iam";
import { Duration } from "@aws-cdk/core";
import * as lambdaEventSources from "@aws-cdk/aws-lambda-event-sources";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as logs from "@aws-cdk/aws-logs";
export class IndexerStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const repository = new ecr.Repository(this, "indexer", {
      repositoryName: "indexer",
     });

  //   // // VPC for ECS
  //   const vpc = new ec2.Vpc(this, "MyVpc", { maxAzs: 3 });
  //   const cluster = new ecs.Cluster(this, "Cluster", {
  //     vpc,
  //   });

  //   // Create an SNS topic to be used by Fargate
  //   const topic = new sns.Topic(this, "IndexerTopic", {
  //     displayName: "Indexer Topic for EVM based blockchains",
  //   });

  //   // Create an IAM role that has permissions to send messages to the SNS topic

  //   const ecsFargateRole = new iam.Role(this, "MyRole", {
  //     assumedBy: new iam.ServicePrincipal("ecs-tasks.amazonaws.com"),
  //   });
  //   ecsFargateRole.addToPolicy(
  //     new iam.PolicyStatement({
  //       sid: "AllowPublishToMyTopic",
  //       effect: Effect.ALLOW,
  //       actions: ["sns:Publish"],
  //       resources: [topic.topicArn],
  //     })
  //   );
  //   topic.grantPublish(ecsFargateRole);

  //   // Create an SQS queue to subscribe to SNS
  //   const dlq: any = new sqs.Queue(this, "IndexerDLQ", {
  //     visibilityTimeout: cdk.Duration.seconds(300),
  //   });
  //   const queue: any = new sqs.Queue(this, "IndexerQueue", {
  //     visibilityTimeout: cdk.Duration.seconds(300),
  //     deadLetterQueue: {
  //       queue: dlq,
  //       maxReceiveCount: 1,
  //     },
  //   });
  //   topic.addSubscription(new snsSubscriptions.SqsSubscription(queue));

  //   const taskDefinition = new ecs.TaskDefinition(this, "indexerTask", {
  //     taskRole: ecsFargateRole,
  //     memoryMiB: "1024",
  //     cpu: "512",
  //     compatibility: ecs.Compatibility.FARGATE,
  //   });

  //   const indexerLogGroup: any = new logs.LogGroup(this, "indexerLogGroup", {
  //     logGroupName: "/ecs/Indexer",
  //     removalPolicy: cdk.RemovalPolicy.DESTROY,
  //   });

  //   const indexerLogDriver = new ecs.AwsLogDriver({
  //     logGroup: indexerLogGroup,
  //     streamPrefix: "Indexer",
  //   });
  //   const container = taskDefinition.addContainer("indexerLogGroup", {
  //     image: ecs.ContainerImage.fromEcrRepository(repository),
  //     logging: indexerLogDriver,
  //     environment: {
  //       TOPIC_ARN: topic.topicArn,
  //       NETWORK_NAME: this.node.tryGetContext("eth_goreli").chainName,
  //       API_KEY: this.node.tryGetContext("eth_goreli").aclhemyApiKey,
  //       EVENT_NAME: this.node.tryGetContext("eth_goreli").eventName,
  //       DIALECT: this.node.tryGetContext("sql").dialect,
  //       HOST: this.node.tryGetContext("sql").host,
  //       USERNAME: this.node.tryGetContext("sql").username,
  //       PORT: this.node.tryGetContext("sql").port,
  //       PASSWORD: this.node.tryGetContext("sql").password,
  //       DATABASE: this.node.tryGetContext("sql").database,
  //     },
  //   });

  //   container.addPortMappings({
  //     containerPort: 80,
  //   });

  //   ecsFargateRole.addManagedPolicy(
  //     iam.ManagedPolicy.fromAwsManagedPolicyName(
  //       "service-role/AmazonECSTaskExecutionRolePolicy"
  //     )
  //   );
  //   const fargate = new ecs.FargateService(this, "MyFargateService", {
  //     cluster: cluster, // Required
  //     desiredCount: 1, // Default is 1
  //     taskDefinition: taskDefinition,
  //   });

  //   topic.addToResourcePolicy(
  //     new iam.PolicyStatement({
  //       effect: Effect.ALLOW,
  //       principals: [new AnyPrincipal()],
  //       actions: ["sns:Publish"],
  //       resources: [topic.topicArn],
  //       conditions: {
  //         ArnEquals: {
  //           "aws:PrincipalArn": `${fargate.taskDefinition.taskRole.roleArn}`,
  //         },
  //       },
  //     })
  //   );

  //   const transactionProcessorLambda: any = new lambda.Function(
  //     this,
  //     "Handler",
  //     {
  //       runtime: lambda.Runtime.NODEJS_16_X,
  //       handler: "src/index.handler",
  //       code: lambda.Code.fromAsset("./serverless-api/dist/lambda.zip"),
  //       memorySize: 512,
  //       description: `Generated on: ${new Date().toISOString()}`,
  //       timeout: Duration.seconds(60),
  //       environment: {
  //         TOPIC_ARN: topic.topicArn,
  //         NETWORK_NAME: this.node.tryGetContext("eth_goreli").chainName,
  //         API_KEY: this.node.tryGetContext("eth_goreli").aclhemyApiKey,
  //         EVENT_NAME: this.node.tryGetContext("eth_goreli").eventName,
  //         DIALECT: this.node.tryGetContext("sql").dialect,
  //         HOST: this.node.tryGetContext("sql").host,
  //         USERNAME: this.node.tryGetContext("sql").username,
  //         PORT: this.node.tryGetContext("sql").port,
  //         PASSWORD: this.node.tryGetContext("sql").password,
  //         DATABASE: this.node.tryGetContext("sql").database,
  //       },
  //     }
  //   );

  //   // Allow the transaction processor lambda to be triggered by SQS

  //   queue.grantConsumeMessages(transactionProcessorLambda);
  //   const eventSource = new lambdaEventSources.SqsEventSource(queue);
  //   transactionProcessorLambda.addEventSource(eventSource);

  //   // Get Transaction Lambda and APiI Gateway Creation

  //   const getTxLambda: any = new lambda.Function(this, "getTxLambda", {
  //     runtime: lambda.Runtime.NODEJS_16_X,
  //     handler: "src/getTxs.handler",
  //     code: lambda.Code.fromAsset("./serverless-api/dist/lambda.zip"),
  //     memorySize: 512,
  //     description: `Generated on: ${new Date().toISOString()}`,
  //     timeout: Duration.seconds(60),
  //     environment: {
  //       TOPIC_ARN: topic.topicArn,
  //       NETWORK_NAME: this.node.tryGetContext("eth_goreli").chainName,
  //       API_KEY: this.node.tryGetContext("eth_goreli").aclhemyApiKey,
  //       EVENT_NAME: this.node.tryGetContext("eth_goreli").eventName,
  //       DIALECT: this.node.tryGetContext("sql").dialect,
  //       HOST: this.node.tryGetContext("sql").host,
  //       USERNAME: this.node.tryGetContext("sql").username,
  //       PORT: this.node.tryGetContext("sql").port,
  //       PASSWORD: this.node.tryGetContext("sql").password,
  //       DATABASE: this.node.tryGetContext("sql").database,
  //     },
  //   });
  //   const api = new apigateway.RestApi(this, "MyApi", {
  //     description: "My API Gateway",
  //     restApiName: "MyAPI",
  //     defaultCorsPreflightOptions: {
  //       allowOrigins: ["*"],
  //       allowMethods: ["GET", "POST", "PUT"],
  //       allowHeaders: ["Content-Type", "Authorization"],
  //     },
  //   });

  //   getTxLambda.addPermission("PermitAPIGInvocation", {
  //     principal: new ServicePrincipal("apigateway.amazonaws.com"),
  //     sourceArn: api.arnForExecuteApi("*"),
  //   });

  //   const txIntegration = new apigateway.LambdaIntegration(getTxLambda, {});
  //   const apiKey = api.addApiKey("ApiKey");
  //   const resource = api.root.addResource("tx");
  //   const method = resource.addMethod("GET", txIntegration, {
  //     requestParameters: {
  //       "method.request.querystring.address": true,
  //       "method.request.querystring.offset": true,
  //       "method.request.querystring.limit": true,
  //     },
  //     apiKeyRequired: true,
  //   }); // GET /

  //   const plan = api.addUsagePlan("UsagePlan", {
  //     name: "indexerUsagePlan",
  //     throttle: {
  //       rateLimit: 10,
  //       burstLimit: 2,
  //     },
  //   });
  //   plan.addApiStage({
  //     stage: api.deploymentStage,
  //     throttle: [
  //       {
  //         method: method,
  //         throttle: {
  //           rateLimit: 10,
  //           burstLimit: 2,
  //         },
  //       },
  //     ],
  //   });

  //   plan.addApiKey(apiKey);
   }
}
