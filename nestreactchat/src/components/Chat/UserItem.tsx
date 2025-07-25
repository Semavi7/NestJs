import React from 'react';
import type { User } from '../../types/user';

interface UserItemProps {
  user: User;
  isSelected: boolean;
  isOnline?: boolean;
  isTyping?: boolean;
  onClick: () => void;
}

const UserItem: React.FC<UserItemProps> = ({ 
  user, 
  isSelected, 
  isOnline = false, 
  isTyping = false, 
  onClick 
}) => {
  return (
    <div
      className={`flex items-center p-3 cursor-pointer ${
        isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="relative">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">
          {user.username.charAt(0).toUpperCase()}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
        )}
      </div>
      <div className="ml-3 flex-grow">
        <div className="font-medium">{user.username}</div>
        {isTyping && (
          <div className="text-xs text-gray-500">typing...</div>
        )}
      </div>
    </div>
  );
};

export default UserItem;