import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/react/build-subdomain/authentication/
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
});
