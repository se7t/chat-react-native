/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from '@apollo/client';
import * as AbsintheSocket from '@absinthe/socket';
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link';
import { Socket as PhoenixSocket } from 'phoenix';
import { hasSubscription } from '@jumpn/utils-graphql';
import { setContext } from '@apollo/client/link/context';

const HTTP_URI = process.env.REACT_NATIVE_HTTP_URI;

const WS_URI = process.env.REACT_NATIVE_WSS_URI;

const AUTH_TOKEN = process.env.REACT_NATIVE_CHAT_AUTH_TOKEN;

const createClient = () => {
  const httpLink = createHttpLink({ uri: HTTP_URI });

  const absintheSocket = AbsintheSocket.create(
    new PhoenixSocket(WS_URI, {
      params: () => {
        if (AUTH_TOKEN) {
          return {
            token: AUTH_TOKEN,
          };
        }
        return {};
      },
    }),
  );

  const socketLink = createAbsintheSocketLink(absintheSocket);

  const splitLink = split(
    operation => hasSubscription(operation.query),
    socketLink,
    httpLink,
  );

  const authLink = setContext((_, { headers }) => {
    const token = AUTH_TOKEN;

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const link = authLink.concat(splitLink);

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
};

export default createClient;
