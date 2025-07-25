import { useState, useEffect, useCallback } from 'react';
import { getSocket } from '../services/socket';
import { messagesAPI, usersAPI } from '../services/api';
import { User, UserStatus } from '../types/user';
import { Message } from '../types/message';
import { useAuth } from './useAuth';

export const useChat = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = useCallback(async () => {
    try {
      const userList = await usersAPI.getAllUsers();
      const filteredUsers = userList.filter(u => u._id !== user?.id);
      setUsers(filteredUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  }, [user]);

  const fetchMessages = useCallback(async (userId: string) => {
    if (!userId) return;
    
    try {
      setLoading(true);
      const conversation = await messagesAPI.getConversation(userId);
      setMessages(conversation);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setLoading(false);
    }
  }, []);

  const selectUser = useCallback((user: User) => {
    setSelectedUser(user);
    fetchMessages(user._id);
  }, [fetchMessages]);

  const sendMessage = useCallback((content: string) => {
    if (!selectedUser || !user) return;
    
    const socket = getSocket();
    const token = localStorage.getItem('token');
    
    if (socket && token) {
      const messageData = {
        content,
        to: selectedUser._id,
      };
      
      socket.emit('sendMessage', { token, message: messageData });
      
      const optimisticMessage: Message = {
        _id: Date.now().toString(), 
        content,
        from: { _id: user.id, username: user.username },
        to: { _id: selectedUser._id, username: selectedUser.username },
        createdAt: new Date().toISOString(),
        read: false,
      };
      
      setMessages(prev => [...prev, optimisticMessage]);
    }
  }, [selectedUser, user]);

  const sendTyping = useCallback((isTyping: boolean) => {
    if (!selectedUser) return;
    
    const socket = getSocket();
    const token = localStorage.getItem('token');
    
    if (socket && token) {
      socket.emit('typing', { token, to: selectedUser._id, isTyping });
    }
  }, [selectedUser]);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    
    socket.on('newMessage', (data) => {
      if (selectedUser?._id === data.from) {
        setMessages(prev => [...prev, data.message]);
      }
    });
    
    socket.on('userStatus', (data) => {
      if (data.status === 'online') {
        setOnlineUsers(prev => [...prev, data.userId]);
      } else {
        setOnlineUsers(prev => prev.filter(id => id !== data.userId));
      }
    });
    
    socket.on('userTyping', (data) => {
      if (data.isTyping) {
        setTypingUsers(prev => [...prev, data.userId]);
      } else {
        setTypingUsers(prev => prev.filter(id => id !== data.userId));
      }
    });
    
    return () => {
      socket.off('newMessage');
      socket.off('userStatus');
      socket.off('userTyping');
    };
  }, [selectedUser]);

  useEffect(() => {
    if (user) {
      fetchUsers();
    }
  }, [user, fetchUsers]);
  
  return {
    users,
    selectedUser,
    messages,
    loading,
    onlineUsers,
    typingUsers,
    selectUser,
    sendMessage,
    sendTyping,
  };
};