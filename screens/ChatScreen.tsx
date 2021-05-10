/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { Button, Image, View, Text } from 'react-native';
import { tailwind } from '../lib/tailwind';
import PhoneIcon from '../assets/phone.svg';
import VideoCallIcon from '../assets/videocall.svg';

// TODO: Add type checking to navigation
const ChatScreen: React.FC = ({ navigation }) => {
  useEffect(
    () =>
      navigation.setOptions({
        title: false,
        headerStyle: tailwind('bg-blue-tint-1 rounded-3xl h-28'),
        headerLeft: () => (
          <View style={tailwind('flex flex-row mt-4 ml-4')}>
            <Image source={require('../assets/sample-avatar.png')} />
            <View style={tailwind('ml-3 flex justify-around')}>
              <Text
                style={[
                  tailwind('text-lg text-plum-normal'),
                  { fontFamily: 'Poppins-SemiBold' },
                ]}
              >
                Generic Chat Room
              </Text>
              <Text
                style={[
                  tailwind('text-white leading-3'),
                  { fontFamily: 'SFCompactText-Regular' },
                ]}
              >
                Active now
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View style={tailwind('flex flex-row mt-4')}>
            <PhoneIcon />
            <VideoCallIcon style={tailwind('ml-2 mr-4')} />
          </View>
        ),
      }),
    [navigation],
  );

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
