import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator, View, Heading, Flex } from '@aws-amplify/ui-react';
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

  // We force a fallback to an empty array so the UI never crashes
  const safeMessages = chatData ? chatData : [];

  return (
    <Authenticator hideSignUp={true}>
      {({ signOut }) => (
        <View padding="20px">
          <Flex justifyContent="space-between" marginBottom="20px">
            <Heading level={1}>Internal KB</Heading>
            <button onClick={signOut}>Sign Out</button>
          </Flex>
          
          <AIConversation
            messages={safeMessages} 
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            allowAttachments={true}
            welcomeMessage="System Ready. How can I help?"
          />
        </View>
      )}
    </Authenticator>
  );
}
