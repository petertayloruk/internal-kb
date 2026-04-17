import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model('Amazon Nova Pro'),
    systemPrompt: 'You are an internal assistant. Use the knowledge base to answer queries with text, images, and video timestamps.',
    inferenceConfiguration: {
      knowledgeBaseId: 'YOUR_KB_ID'
    }
  }),
  Feedback: a.model({
    messageId: a.id().required(),
    isPositive: a.boolean().required(),
  }).authorization((allow) => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });
