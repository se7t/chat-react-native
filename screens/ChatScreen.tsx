/* eslint-disable global-require */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, View, Text } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { GiftedChat } from 'react-native-gifted-chat';
import { tailwind } from '../utils/tailwind';
import PhoneIcon from '../assets/phone.svg';
import VideoCallIcon from '../assets/videocall.svg';
import { ChatScreenNavigationProp, ChatScreenRouteProp } from '../navigation';

type NavigationProps = {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
};

interface MessagesData {
  room: {
    id: string;
    messages: {
      body: string;
      id: string;
      insertedAt: string;
      map?: any;
      user: {
        email: string;
        firstName: string;
        id: string;
        lastName: string;
        profilePic: string;
        role: string;
      };
    };
    name: string;
    roomPic: string;
  };
  user: {
    id: string;
  };
}

const TWG_ROOM_MESSAGES = gql`
  query GetMessages($roomId: String) {
    room(id: $roomId) {
      id
      messages {
        body
        id
        insertedAt
        user {
          email
          firstName
          id
          lastName
          profilePic
          role
        }
      }
      name
      roomPic
    }
    user {
      id
    }
  }
`;

const ADD_NEW_MESSAGE = gql`
  mutation sendMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        id
        lastName
        profilePic
        role
      }
    }
  }
`;

const ChatScreen: React.FC<NavigationProps> = ({ route, navigation }) => {
  // FETCH MESSAGES

  const { loading, error, data } = useQuery<MessagesData>(TWG_ROOM_MESSAGES, {
    variables: {
      roomId: route.params.selectedRoomId,
    },
  });

  const [messages, setMessages] = useState([]);

  const parseMessage = (message: any) => {
    return {
      _id: message.id,
      text: message.body,
      createdAt: message.insertedAt,
      user: {
        _id: message.user.id,
        name: `${message.user.firstName} ${message.user.lastName}`,
        avatar: message.user.profilePic,
      },
    };
  };

  useEffect(() => {
    if (!loading && data) {
      const parsedMessages = data.room.messages.map((message: any) =>
        parseMessage(message),
      );
      setMessages(parsedMessages);
    }
  }, [data, loading]);

  // SEND MESSAGES

  const [sendMessage] = useMutation(ADD_NEW_MESSAGE);

  const onSend = useCallback(
    (newMessages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      sendMessage({
        variables: {
          body: newMessages[0].text,
          roomId: route.params.selectedRoomId,
        },
      });
    },
    [route.params.selectedRoomId, sendMessage],
  );

  useEffect(
    () =>
      navigation.setOptions({
        title: '',
        headerStyle: tailwind('bg-blue-tint-1 rounded-3xl h-28'),
        headerLeft: () => (
          <View style={tailwind('flex flex-row mt-4 ml-4')}>
            <Image
              source={
                data &&
                (data.room.roomPic !== ''
                  ? { uri: data.room.roomPic }
                  : require('../assets/sample-avatar.png'))
              }
              style={tailwind('h-12 w-12 rounded-full')}
            />
            <View style={tailwind('ml-3 flex justify-around')}>
              <Text
                style={[
                  tailwind('text-lg text-plum-normal'),
                  { fontFamily: 'Poppins-SemiBold' },
                ]}
              >
                {data &&
                  (data.room.name.length > 16
                    ? `${data.room.name.substring(0, 16)}...`
                    : data.room.name)}
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
    [data, navigation],
  );

  return data ? (
    <GiftedChat
      messages={messages}
      onSend={newMessages => onSend(newMessages)}
      user={{
        _id: data.user.id,
      }}
    />
  ) : (
    <View style={tailwind('mt-4 self-center')}>
      <Text style={tailwind('text-base')}>
        {error ? 'Error loading messages.' : 'Loading messages...'}
      </Text>
    </View>
  );
};

export default ChatScreen;
