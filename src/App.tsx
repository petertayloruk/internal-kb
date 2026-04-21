import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator, View, Heading, Text, Flex } from '@aws-amplify/ui-react';
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
      {({ signOut, user }) => (
        <View padding="20px">
          <Flex justifyContent="space-between" alignItems="center" marginBottom="20px">
            <Heading level={1}>Internal KB</Heading>
            <Flex alignItems="center" gap="10px">
              <Text fontSize="small">{user?.loginId}</Text>
              <button onClick={signOut}>Sign Out</button>
            </Flex>
          </Flex>
          
          {/* We show the conversation immediately now. 
              If chatData is still null, we pass an empty array []. */}
          <AIConversation
            messages={chatData || []} 
            isLoading={isLoading}
            handleSendMessage={handleSendMessage}
            allowAttachments={true}
            welcomeMessage="Hello! How can I help you with the internal knowledge base today?"
          />
        </View>
      )}
    </Authenticator>
  );
}
