import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';

const backend = defineBackend({
  auth,
  data,
});

// 1. Add the Bedrock connection
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

// 2. Grant permission using your exact Bedrock ARN
const backendRole = backend.data.resources.graphqlApi.apiRole;

backendRole.addToPrincipalPolicy(
  new PolicyStatement({
    actions: ['bedrock:Retrieve'],
    resources: ['arn:aws:bedrock:eu-west-1:471112926741:knowledge-base/BOTYIJFFS2'],
  })
);
