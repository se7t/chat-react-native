import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
  Rooms: undefined;
  Chat: {
    selectedRoomId: string;
  };
};

type RoomsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Rooms'
>;

type RoomsScreenRouteProp = RouteProp<RootStackParamList, 'Rooms'>;

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
