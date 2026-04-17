import { AIConversation } from '@aws-amplify/ui-react-ai';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();

export default function App() {
  const [handleSendMessage] = client.conversations.chat.useChat();

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    await client.models.Feedback.create({ messageId, isPositive });
    alert("Feedback saved!");
  };

  return (
    <Authenticator>
      <div style={{ padding: '20px' }}>
        <h1>Internal Knowledge Base</h1>
        <AIConversation
          handleSendMessage={handleSendMessage}
          allowAttachments={true}
          actions={(msg) => (
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleFeedback(msg.id, true)}>👍</button>
              <button onClick={() => handleFeedback(msg.id, false)}>👎</button>
            </div>
          )}
        />
      </div>
    </Authenticator>
  );
}
