/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import RoomsScreen from './screens/RoomsScreen';
import ChatScreen from './screens/ChatScreen';

type RootStackParamList = {
  Rooms: undefined;
  Chat: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  return fontsLoaded ? (
    <NavigationContainer>
      <StatusBar />
      <RootStack.Navigator initialRouteName="Rooms">
        <RootStack.Screen name="Rooms" component={RoomsScreen} />
        <RootStack.Screen name="Chat" component={ChatScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  ) : (
    <></>
  );
};

export default App;
