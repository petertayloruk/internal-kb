import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator, View, Heading, Text } from '@aws-amplify/ui-react';
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
      {({ signOut, user }) => (
        <View padding="20px">
          <Heading level={1}>Internal Knowledge Base</Heading>
          <View margin="10px 0">
             <Text>Logged in as: {user?.loginId}</Text>
             <button onClick={signOut}>Sign Out</button>
          </View>
          
          <AIConversation
            messages={chatData || []} 
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            allowAttachments={true}
            actions={[
              { label: '👍', onClick: (msg) => handleFeedback(msg.id, true) },
              { label: '👎', onClick: (msg) => handleFeedback(msg.id, false) }
            ]}
          />
        </View>
      )}
    </Authenticator>
  );
}
