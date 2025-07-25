import React, { useEffect } from 'react';
import UserItem from './UserItem';
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../context/AuthContext';

const ConversationList: React.FC = () => {
  const { state, loadUsers, selectUser } = useChat();
  const { state: authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      loadUsers();
    }
  }, [authState.isAuthenticated]);

  const filteredUsers = state.users.filter(
    user => authState.user && user._id !== authState.user._id
  );

  return (
    <div className="w-1/3 border-r border-gray-300 h-full flex flex-col">
      <div className="p-4 border-b border-gray-300">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      
      <div className="flex-grow overflow-y-auto">
        {state.isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserItem
              key={user._id}
              user={user}
              isSelected={state.selectedUser?._id === user._id}
              isOnline={user.status === 'online'}
              isTyping={state.typingUsers[user._id]}
              onClick={() => selectUser(user)}
            />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No users available
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;