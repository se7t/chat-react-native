/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { tailwind } from '../lib/tailwind';
import SearchIcon from '../assets/search.svg';
import RoomsIcon from '../assets/rooms.svg';

// TODO: Add type checking to navigation
const RoomsScreen: React.FC = ({ navigation }) => {
  // TODO: Change to context
  const [rooms, setRooms] = useState([
    {
      image: '../assets/room-1.png',
      name: 'The one with Harry',
      lastMessage: {
        message: 'Hey Harry, how are you doing?',
        timeAgo: 'now',
        read: false,
      },
    },
    {
      image: '../assets/sample-avatar.png',
      name: 'The one with Ron',
      lastMessage: {
        message: 'Ron sent a photo.',
        timeAgo: '24 m ago',
        read: true,
      },
    },
    {
      image: '../assets/sample-avatar.png',
      name: 'The one with Remus',
      lastMessage: {
        message:
          'My parents tried everything, but insurprisingly it was all for nothing.',
        timeAgo: '2 h ago',
        read: true,
      },
    },
  ]);

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
        cardStyle: tailwind('bg-blue-tint-2'),
      }),
    [navigation],
  );

  return (
    <View style={tailwind('mt-4')}>
      {rooms.map((room, index) => (
        <View
          // Index is appended in case of more rooms with the same name
          // eslint-disable-next-line react/no-array-index-key
          key={room.name.replace(/\s/g, '').toLowerCase() + index}
          style={[
            tailwind('flex flex-row p-4 rounded-xl my-2'),
            room.lastMessage.read
              ? tailwind('bg-white')
              : tailwind('bg-plum-normal'),
          ]}
        >
          <Image source={require('../assets/room-1.png')} />
          <View style={tailwind('flex justify-center ml-4')}>
            <Text
              style={[
                tailwind('text-base'),
                room.lastMessage.read
                  ? tailwind('text-black')
                  : tailwind('text-white'),
                { fontFamily: 'Poppins-Medium' },
              ]}
            >
              {room.name}
            </Text>
            <Text
              style={[
                tailwind('text-base'),
                room.lastMessage.read
                  ? tailwind('text-black')
                  : tailwind('text-white'),
                { fontFamily: 'SFCompactText-Regular' },
              ]}
            >
              {room.lastMessage.message.length > 35
                ? `${room.lastMessage.message.substring(0, 35)}...`
                : room.lastMessage.message}
              {room.lastMessage.message}
            </Text>
          </View>
          <Text
            style={[
              tailwind('absolute right-4 top-2 text-grey-normal text-xs'),
              { fontFamily: 'Poppins-Regular' },
            ]}
          >
            {room.lastMessage.timeAgo}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RoomsScreen;
