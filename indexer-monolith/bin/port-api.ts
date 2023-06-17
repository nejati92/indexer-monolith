#!/usr/bin/env node
import * as cdk from '@aws-cdk/core';
import { IndexerStack } from "../deploy/indexer-stack";
const app = new cdk.App();
new IndexerStack(app, "IndexerStack", {
  env: {
    region: "us-east-1",
    account: "781619103453",
  },
});
