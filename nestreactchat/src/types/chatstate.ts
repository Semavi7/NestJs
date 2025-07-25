import type { Message } from "./message";
import type { User } from "./user";

  
  export interface ChatState {
    users: User[];
    selectedUser: User | null;
    messages: Message[];
    isLoading: boolean;
    error: string | null;
    typingUsers: Record<string, boolean>;
  }