import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import tailwind from 'tailwind-rn';
import SearchIcon from './assets/search.svg';

const App: React.FC = () => {
  return (
    <View style={tailwind('flex-1 justify-center items-center')}>
      <View>
        <Text style={tailwind('bg-red-400')}>test</Text>
        <SearchIcon />
      </View>

      <StatusBar />
    </View>
  );
};

export default App;
