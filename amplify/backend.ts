import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';

/**
 * @see https://docs.amplify.aws/react/build-system/deploy-any-branch/
 */
defineBackend({
  auth,
  data,
});
