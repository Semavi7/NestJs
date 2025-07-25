import React, { useState, useEffect } from 'react';
import { useChat } from '../../context/ChatContext';

const MessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { state, sendMessage, setTyping } = useChat();
  
  useEffect(() => {
    let typingTimeout: NodeJS.Timeout;
    
    if (isTyping) {
      setTyping(true);
      
      typingTimeout = setTimeout(() => {
        setIsTyping(false);
        setTyping(false);
      }, 3000);
    }
    
    return () => {
      clearTimeout(typingTimeout);
      if (isTyping) {
        setTyping(false);
      }
    };
  }, [isTyping, setTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && state.selectedUser) {
      await sendMessage(message.trim());
      setMessage('');
      setIsTyping(false);
      setTyping(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    
    if (!isTyping && e.target.value.trim()) {
      setIsTyping(true);
    } else if (isTyping && !e.target.value.trim()) {
      setIsTyping(false);
      setTyping(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="border-t border-gray-300 p-4 bg-white"
    >
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder={state.selectedUser ? `Message ${state.selectedUser.username}...` : "Select a user to chat"}
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={!state.selectedUser}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400"
          disabled={!message.trim() || !state.selectedUser}
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;