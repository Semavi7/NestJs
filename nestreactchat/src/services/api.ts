import type { Message } from "../types/message";
import type { User } from "../types/user";

const API_URL = 'http://localhost:3000';

export const api = {
  auth: {
    login: async (username: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    },
    register: async (username: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }

      return response.json();
    },
  },
  users: {
    getAll: async (token: string): Promise<User[]> => {
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return response.json();
    },
  },
  messages: {
    getConversation: async (token: string, userId: string): Promise<Message[]> => {
      const response = await fetch(`${API_URL}/messages/conversation/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch conversation');
      }

      return response.json();
    },
  },
};