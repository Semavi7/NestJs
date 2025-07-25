import React from 'react';
import ConversationList from './ConversationList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useChat } from '../../context/ChatContext';

const ChatContainer: React.FC = () => {
  const { state } = useChat();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="bg-blue-500 text-white p-4">
        <h1 className="text-xl font-bold">React Chat App</h1>
      </div>
      
      <div className="flex-grow flex overflow-hidden">
        <ConversationList />
        
        <div className="w-2/3 flex flex-col">
          {state.selectedUser && (
            <div className="p-4 border-b border-gray-300 flex items-center">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-semibold">
                {state.selectedUser.username.charAt(0).toUpperCase()}
              </div>
              <h2 className="ml-3 text-lg font-semibold">{state.selectedUser.username}</h2>
            </div>
          )}
          
          <MessageList />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;