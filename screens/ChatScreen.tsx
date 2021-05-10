import React from 'react';
import { Button, View, Text } from 'react-native';

// TODO: Add type checking to navigation
const ChatScreen: React.FC = ({ navigation }) => {
  return (
    <View>
      <Text>Hi Chat</Text>
      <Button
        title="Go to Room List"
        onPress={() => navigation.navigate('Rooms')}
      />
    </View>
  );
};

export default ChatScreen;
