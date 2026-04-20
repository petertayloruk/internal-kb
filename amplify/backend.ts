import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// 1. Add the Bedrock HTTP Data Source
backend.data.addHttpDataSource(
  'BedrockKB',
  'https://bedrock-runtime.eu-west-1.amazonaws.com',
  {
    authorizationConfig: {
      signingRegion: 'eu-west-1',
      signingServiceName: 'bedrock',
    },
  }
);

// 2. Correctly grant permission to the Backend Role
// We access the role from the generated L3 construct
const backendRole = backend.data.resources.graphqlApi.apiRole;

backendRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ['bedrock:Retrieve'],
    resources: ['arn:aws:aoss:eu-west-1:471112926741:collection/595iilxjnd14z2wuttyi'], // Ensure this is your actual ARN
  })
);
