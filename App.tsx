/* eslint-disable global-require */
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { ApolloProvider } from '@apollo/client';
import RoomsScreen from './screens/RoomsScreen';
import ChatScreen from './screens/ChatScreen';
import { RootStackParamList } from './navigation';
import createClient from './utils/apolloClient';

const RootStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Medium': require('./assets/fonts/Poppins/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
      'SFCompactText-Regular': require('./assets/fonts/SFCompactText/SFCompactText-Regular.ttf'),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const client = useRef(createClient());

  return fontsLoaded ? (
    <ApolloProvider client={client.current}>
      <NavigationContainer>
        <StatusBar />
        <RootStack.Navigator initialRouteName="Rooms">
          <RootStack.Screen name="Rooms" component={RoomsScreen} />
          <RootStack.Screen name="Chat" component={ChatScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  ) : (
    <></>
  );
};

export default App;
