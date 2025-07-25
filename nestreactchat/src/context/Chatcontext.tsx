import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

import { api } from '../services/api';
import { socketService } from '../services/socket';
import { useAuth } from './AuthContext';
import type { User } from '../types/user';
import type { Message } from '../types/message';
import type { ChatState } from '../types/chatstate';

type ChatAction =
  | { type: 'FETCH_USERS_REQUEST' }
  | { type: 'FETCH_USERS_SUCCESS'; payload: User[] }
  | { type: 'FETCH_USERS_FAILURE'; payload: string }
  | { type: 'SELECT_USER'; payload: User }
  | { type: 'FETCH_MESSAGES_REQUEST' }
  | { type: 'FETCH_MESSAGES_SUCCESS'; payload: Message[] }
  | { type: 'FETCH_MESSAGES_FAILURE'; payload: string }
  | { type: 'ADD_MESSAGE'; payload: Message }
  | { type: 'SET_USER_TYPING'; payload: { userId: string; isTyping: boolean } }
  | { type: 'SET_USER_STATUS'; payload: { userId: string; status: string } };

const initialState: ChatState = {
  users: [],
  selectedUser: null,
  messages: [],
  isLoading: false,
  error: null,
  typingUsers: {},
};

const ChatContext = createContext<{
  state: ChatState;
  loadUsers: () => Promise<void>;
  selectUser: (user: User) => Promise<void>;
  sendMessage: (content: string) => Promise<void>;
  setTyping: (isTyping: boolean) => void;
}>({
  state: initialState,
  loadUsers: async () => {},
  selectUser: async () => {},
  sendMessage: async () => {},
  setTyping: () => {},
});

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
    case 'FETCH_MESSAGES_REQUEST':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'FETCH_USERS_SUCCESS':
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null,
      };
    case 'FETCH_USERS_FAILURE':
    case 'FETCH_MESSAGES_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'SELECT_USER':
      return {
        ...state,
        selectedUser: action.payload,
      };
    case 'FETCH_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: action.payload,
        isLoading: false,
        error: null,
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case 'SET_USER_TYPING':
      return {
        ...state,
        typingUsers: {
          ...state.typingUsers,
          [action.payload.userId]: action.payload.isTyping,
        },
      };
    case 'SET_USER_STATUS':
      return {
        ...state,
        users: state.users.map(user => 
          user._id === action.payload.userId 
            ? { ...user, status: action.payload.status } 
            : user
        ),
      };
    default:
      return state;
  }
};

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const { state: authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated && authState.token) {
      socketService.connect(authState.token);

      socketService.onNewMessage((data) => {
        dispatch({ type: 'ADD_MESSAGE', payload: data.message });
      });

      socketService.onUserTyping((data) => {
        dispatch({ 
          type: 'SET_USER_TYPING', 
          payload: { userId: data.userId, isTyping: data.isTyping } 
        });
      });

      socketService.onUserStatus((data) => {
        dispatch({ 
          type: 'SET_USER_STATUS', 
          payload: { userId: data.userId, status: data.status } 
        });
      });

      return () => {
        socketService.disconnect();
      };
    }
  }, [authState.isAuthenticated, authState.token]);

  const loadUsers = async () => {
    if (!authState.token) return;

    dispatch({ type: 'FETCH_USERS_REQUEST' });
    try {
      const users = await api.users.getAll(authState.token);
      dispatch({ type: 'FETCH_USERS_SUCCESS', payload: users });
    } catch (error) {
      dispatch({
        type: 'FETCH_USERS_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to fetch users',
      });
    }
  };

  const selectUser = async (user: User) => {
    if (!authState.token) return;

    dispatch({ type: 'SELECT_USER', payload: user });
    dispatch({ type: 'FETCH_MESSAGES_REQUEST' });
    
    try {
      const messages = await api.messages.getConversation(authState.token, user._id);
      dispatch({ type: 'FETCH_MESSAGES_SUCCESS', payload: messages });
    } catch (error) {
      dispatch({
        type: 'FETCH_MESSAGES_FAILURE',
        payload: error instanceof Error ? error.message : 'Failed to fetch conversation',
      });
    }
  };

  const sendMessage = async (content: string) => {
    if (!authState.token || !state.selectedUser) return;

    try {
      const message = await socketService.sendMessage(
        authState.token,
        state.selectedUser._id,
        content
      );
      dispatch({ type: 'ADD_MESSAGE', payload: message });
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const setTyping = (isTyping: boolean) => {
    if (!authState.token || !state.selectedUser) return;
    
    socketService.setTyping(authState.token, state.selectedUser._id, isTyping);
  };

  return (
    <ChatContext.Provider value={{ state, loadUsers, selectUser, sendMessage, setTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);