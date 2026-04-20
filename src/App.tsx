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

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <View padding="20px">
          <Heading level={1}>Internal Knowledge Base</Heading>
          <button onClick={signOut} style={{ marginBottom: '20px' }}>Sign Out</button>
          
          <AIConversation
            messages={chatData || []} 
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            allowAttachments={true}
          />
        </View>
      )}
    </Authenticator>
  );
}
