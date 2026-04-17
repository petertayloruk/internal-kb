export function request(ctx) {
  return {
    version: '2018-05-29',
    method: 'POST',
    resourcePath: '/knowledgebases/YOUR_KNOWLEDGE_BASE_ID/retrieve',
    params: {
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        retrievalQuery: { text: ctx.arguments.input },
      }),
    },
  };
}

export function response(ctx) {
  return JSON.stringify(ctx.result.body);
}
