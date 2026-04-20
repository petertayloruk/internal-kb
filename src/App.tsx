import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator, View, Heading } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { Schema } from '../amplify/data/resource';
import '@aws-amplify/ui-react/styles.css';

const client = generateClient<Schema>();
const { useAIConversation } = createAIHooks(client);

export default function App() {
  const [
    { data: chatData, isLoading },
    handleSendMessage
  ] = useAIConversation('chat');

  const handleFeedback = async (messageId: string, isPositive: boolean) => {
    await client.models.Feedback.create({ messageId, isPositive });
    alert("Feedback saved!");
  };

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <View padding="20px">
          <Heading level={1}>Internal Knowledge Base</Heading>
          <button onClick={signOut} style={{ marginBottom: '10px' }}>Sign Out</button>
          <AIConversation
            messages={chatData || []} // Fix: Ensure it's always an array to prevent .filter error
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            allowAttachments={true}
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
        </View>
      )}
    </Authenticator>
  );
}
