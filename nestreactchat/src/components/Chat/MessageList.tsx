import React, { useEffect, useRef } from 'react';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';
import type { Message } from '../../types/message';
import type { User } from '../../types/user';
const MessageList: React.FC = () => {
  const { state } = useChat();
  const { state: authState } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.messages]);

  if (!state.selectedUser) {
    return (
      <div className="flex-grow flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const isCurrentUser = (message: Message) => {
    if (typeof message.from === 'string') {
      return message.from === authState.user?._id;
    }
    return (message.from as User)._id === authState.user?._id;
  };

  const getSenderName = (message: Message) => {
    if (typeof message.from === 'string') {
      return 'User';
    }
    return (message.from as User).username;
  };

  return (
    <div className="flex-grow flex flex-col p-4 overflow-y-auto bg-gray-50">
      {state.isLoading ? (
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      ) : state.messages.length > 0 ? (
        <>
          {state.messages.map((message, index) => (
            <div
              key={message._id || index}
              className={`mb-4 flex ${
                isCurrentUser(message) ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                  isCurrentUser(message)
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white border border-gray-300 rounded-bl-none'
                }`}
              >
                {!isCurrentUser(message) && (
                  <div className="font-semibold text-xs mb-1">
                    {getSenderName(message)}
                  </div>
                )}
                <div>{message.content}</div>
                <div
                  className={`text-xs mt-1 ${
                    isCurrentUser(message) ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {message.createdAt && formatTime(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-gray-500">No messages yet. Start a conversation!</p>
        </div>
      )}

      {state.typingUsers[state.selectedUser._id] && (
        <div className="text-sm text-gray-500 italic mb-2">
          {state.selectedUser.username} is typing...
        </div>
      )}
    </div>
  );
};

export default MessageList;