import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Rooms: undefined;
  Chat: undefined;
};

type RoomsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Rooms'
>;

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
