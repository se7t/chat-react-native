import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoomsScreen from './screens/RoomsScreen';
import ChatScreen from './screens/ChatScreen';

type RootStackParamList = {
  Rooms: undefined;
  Chat: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator initialRouteName="Rooms">
        <RootStack.Screen name="Rooms" component={RoomsScreen} />
        <RootStack.Screen name="Chat" component={ChatScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
