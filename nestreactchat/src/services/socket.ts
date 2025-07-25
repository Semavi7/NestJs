import { io, Socket } from 'socket.io-client';
import type { Message } from '../types/message';

const SOCKET_URL = 'http://localhost:3000'; 

interface SocketService {
  socket: Socket | null;
  connect: (token: string) => void;
  disconnect: () => void;
  sendMessage: (token: string, to: string, content: string) => Promise<Message>;
  onNewMessage: (callback: (data: { message: Message; from: string }) => void) => void;
  setTyping: (token: string, to: string, isTyping: boolean) => void;
  onUserTyping: (callback: (data: { userId: string; isTyping: boolean }) => void) => void;
  onUserStatus: (callback: (data: { userId: string; status: string }) => void) => void;
}

export const socketService: SocketService = {
  socket: null,

  connect(token: string) {
    if (this.socket?.connected) return;
    
    this.socket = io(SOCKET_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
    
    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
    
    this.socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });
  },

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  },

  sendMessage(token: string, to: string, content: string) {
    return new Promise<Message>((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not connected'));
        return;
      }

      this.socket.emit(
        'sendMessage',
        { token, message: { to, content } },
        (response: { success: boolean; message?: Message; error?: string }) => {
          if (response.success && response.message) {
            resolve(response.message);
          } else {
            reject(new Error(response.error || 'Failed to send message'));
          }
        }
      );
    });
  },

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  },

  setTyping(token: string, to: string, isTyping: boolean) {
    if (this.socket) {
      this.socket.emit('typing', { token, to, isTyping });
    }
  },

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('userTyping', callback);
    }
  },

  onUserStatus(callback) {
    if (this.socket) {
      this.socket.on('userStatus', callback);
    }
  },
};