import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

export default function App() {
  // Fix: Renamed hook and data structure
  const [
    { data: chatData, isLoading },
    handleSendMessage
  ] = useAIConversation('chat');

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    await client.models.Feedback.create({ messageId, isPositive });
    alert("Saved!");
  };

  return (
    <Authenticator>
      <div style={{ padding: '20px' }}>
        <h1>Internal KB</h1>
        <AIConversation
          messages={chatData}
          isLoading={isLoading}
          handleSendMessage={handleSendMessage}
          allowAttachments={true}
          // Fix: Actions now expect an array of objects
          actions={[
            {
              label: '👍',
              onClick: (msg) => handleFeedback(msg.id, true),
            },
            {
              label: '👎',
              onClick: (msg) => handleFeedback(msg.id, false),
            }
          ]}
        />
      </div>
    </Authenticator>
  );
}
