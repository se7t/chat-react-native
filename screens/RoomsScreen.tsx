import React from 'react';
import { View, Text, Button } from 'react-native';

// TODO: Add type checking to navigation
const RoomsScreen: React.FC = ({ navigation }) => {
  return (
    <View>
      <Text>Hi Roomlist</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

export default RoomsScreen;
