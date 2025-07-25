import type { User } from "./user";

 export interface Message {
    _id: string;
    content: string;
    from: User | string;
    to: User | string;
    read: boolean;
    createdAt: string;
  }