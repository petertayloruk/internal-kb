import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  chat: a.conversation({
    aiModel: a.ai.model('Amazon Nova Pro'),
    systemPrompt: 'You are an internal assistant. Use the knowledge base to answer queries with text, images, and video timestamps.',
    tools: [
      a.ai.dataTool({
        name: 'searchKnowledgeBase',
        description: 'Searches the internal company knowledge base.',
        query: a.ref('knowledgeBase'),
      })
    ]
  }).authorization((allow) => allow.owner()), // <--- THIS FIXES THE ERROR

  knowledgeBase: a.query()
    .arguments({ input: a.string() })
    .returns(a.string())
    .handler(a.handler.custom({ 
      entry: './kbResolver.js', 
      dataSource: 'BedrockKB' 
    }))
    .authorization((allow) => allow.authenticated()),

  Feedback: a.model({
    messageId: a.id().required(),
    isPositive: a.boolean().required(),
  }).authorization((allow) => [allow.owner()]) // <--- ALSO SECURE THE FEEDBACK MODEL
});

export type Schema = ClientSchema<typeof schema>;
export const data = defineData({ schema });
