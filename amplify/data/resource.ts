import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model('Amazon Nova Pro'),
    systemPrompt: 'You are an internal assistant. Use the knowledge base to answer queries with text, images, and video timestamps.',
    // In 2026, we connect Knowledge Bases via tools
    tools: [
      a.ai.dataTool({
        name: 'searchKnowledgeBase',
        description: 'Searches the internal company knowledge base for documents, images, and video info.',
        query: a.ref('knowledgeBase'),
      })
    ]
  }),
  // This is the resolver that actually points to your Bedrock ID
  knowledgeBase: a.query()
    .arguments({ input: a.string() })
    .returns(a.string())
    .handler(a.handler.custom({ 
      entry: './kbResolver.js', 
      dataSource: 'BedrockKB' 
    })),

  Feedback: a.model({
    messageId: a.id().required(),
    isPositive: a.boolean().required(),
  }).authorization((allow) => [allow.authenticated()])
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });
