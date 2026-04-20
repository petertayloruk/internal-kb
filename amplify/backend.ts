import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// 1. Add the Bedrock HTTP Data Source
const dataStack = backend.data.resources.nestedStacks['data7552DF31'];
backend.data.addHttpDataSource(
  'BedrockKB',
  'https://bedrock-runtime.eu-west-1.amazonaws.com', // Change region if not eu-west-1
  {
    authorizationConfig: {
      signingRegion: 'eu-west-1',
      signingServiceName: 'bedrock',
    },
  }
);

// 2. Grant permission to the Backend to call your specific Knowledge Base
backend.data.resources.cfnResources.cfnGraphqlApi.addToRolePolicy(
  new PolicyStatement({
    actions: ['bedrock:Retrieve'],
    resources: ['arn:aws:aoss:eu-west-1:471112926741:collection/595iilxjnd14z2wuttyi'],
  })
);
