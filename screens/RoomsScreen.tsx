/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable global-require */
import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import { gql, useQuery } from '@apollo/client';
import { tailwind } from '../utils/tailwind';
import SearchIcon from '../assets/search.svg';
import RoomsIcon from '../assets/rooms.svg';
import { RoomsScreenNavigationProp, RoomsScreenRouteProp } from '../navigation';

type NavigationProps = {
  route: RoomsScreenRouteProp;
  navigation: RoomsScreenNavigationProp;
};

interface RoomsData {
  usersRooms: {
    rooms: {
      id: string;
      name: string;
      roomPic: string;
      map?: any;
    };
  };
}

const TWG_USERS_ROOMS = gql`
  query GetUsersRooms {
    usersRooms {
      rooms {
        id
        name
        roomPic
      }
    }
  }
`;

// TODO: Add last message
// TODO: Add dynamic time display

const RoomsScreen: React.FC<NavigationProps> = ({ navigation }) => {
  const { loading, error, data } = useQuery<RoomsData>(TWG_USERS_ROOMS);

  const temporaryMessage =
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque in nemo omnis eius aperiam cum id qui ratione quam accusamus debitis sunt architecto vero doloremque, tempore labore dignissimos dolor commodi voluptatem doloribus! Quaerat aperiam laboriosam eius! Ea dolorum perspiciatis totam laborum consequatur doloremque neque ex alias? Laboriosam dolorem harum adipisci!';

  const temporaryTime = '14 m ago';

  useEffect(
    () =>
      navigation.setOptions({
        headerStyle: tailwind('bg-blue-tint-1 rounded-3xl h-28'),
        headerTitleStyle: [
          tailwind('text-2xl text-plum-normal mt-2'),
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

  return !loading && !error && data ? (
    <View style={tailwind('mt-4')}>
      {data.usersRooms.rooms.map(
        (room: Record<string, string>, index: number) => (
          <View
            // Index is appended in case of more rooms with the same name
            // eslint-disable-next-line react/no-array-index-key
            key={room.name.replace(/\s/g, '').toLowerCase() + index}
            style={[tailwind('flex flex-row p-4 rounded-xl my-2 bg-white')]}
            onTouchEnd={() => {
              navigation.navigate('Chat', { selectedRoomId: room.id });
            }}
          >
            <Image
              source={
                room.roomPic !== ''
                  ? { uri: room.roomPic }
                  : require('../assets/sample-avatar.png')
              }
              style={tailwind('h-16 w-16 rounded-full')}
            />
            <View style={tailwind('flex justify-center ml-4')}>
              <Text
                style={[
                  tailwind('text-base'),
                  { fontFamily: 'Poppins-Medium' },
                ]}
              >
                {room.name.length > 32
                  ? `${room.name.substring(0, 32)}...`
                  : room.name}
              </Text>
              <Text
                style={[
                  tailwind('text-base'),

                  { fontFamily: 'SFCompactText-Regular' },
                ]}
              >
                {temporaryMessage.length > 35
                  ? `${temporaryMessage.substring(0, 35)}...`
                  : temporaryMessage}
              </Text>
            </View>
            <Text
              style={[
                tailwind('absolute right-4 top-2 text-grey-normal text-xs'),
                { fontFamily: 'Poppins-Regular' },
              ]}
            >
              {temporaryTime}
            </Text>
          </View>
        ),
      )}
    </View>
  ) : (
    <View style={tailwind('mt-4 self-center')}>
      <Text style={tailwind('text-base')}>
        {error ? 'Error loading rooms.' : 'Loading rooms...'}
      </Text>
    </View>
  );
};

export default RoomsScreen;
