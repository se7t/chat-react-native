import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { tailwind } from '../lib/tailwind';
import SearchIcon from '../assets/search.svg';
import RoomsIcon from '../assets/rooms.svg';

// TODO: Add type checking to navigation
const RoomsScreen: React.FC = ({ navigation }) => {
  useEffect(
    () =>
      navigation.setOptions({
        headerStyle: tailwind('bg-blue-tint-1 rounded-3xl h-28'),
        headerTitleStyle: [
          tailwind('text-3xl text-plum-normal mt-4'),
          { fontFamily: 'Poppins-Bold' },
        ],
        headerRight: () => (
          <View style={tailwind('flex flex-row mt-4')}>
            <SearchIcon />
            <RoomsIcon style={tailwind('ml-2 mr-4')} />
          </View>
        ),
      }),
    [navigation],
  );
  return (
    <View>
      <Text>Hi Roomlist</Text>
      <Button title="Go to Chat" onPress={() => navigation.navigate('Chat')} />
    </View>
  );
};

export default RoomsScreen;
