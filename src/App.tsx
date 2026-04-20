import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai';
import { Authenticator, View, Heading, Text, Loader } from '@aws-amplify/ui-react';
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
          <Heading level={1}>Internal Knowledge Base</Heading>
          <View margin="10px 0" display="flex" justifyContent="space-between">
             <Text>User: {user?.loginId}</Text>
             <button onClick={signOut}>Sign Out</button>
          </View>
          
          {/* GUARD: Only load the chat if data is not null/undefined */}
          {chatData ? (
            <AIConversation
              messages={chatData} 
              isLoading={isLoading}
              handleSendMessage={handleSendMessage}
              allowAttachments={true}
            />
          ) : (
            <View textAlign="center" padding="50px">
              <Loader size="large" />
              <Text>Initializing AI Engine...</Text>
            </View>
          )}
        </View>
      )}
    </Authenticator>
  );
}
