import React, { useState } from 'react';
import axios from 'axios';

const CreateChat = ({ chatClient, userId, isOpen, onClose }) => {
  const [newChannelName, setNewChannelName] = useState('');
  const [newUseremail, setNewUseremail] = useState('');

  const handleCreateChannel = async () => {
    if (!newChannelName || !newUseremail) return;

    const res = await axios.post("http://localhost:3000/getToken",{
      useremail: newUseremail,
    });
    console.log(res.data.userId);

    await chatClient.channel('messaging', newChannelName, {
      name: newChannelName,
      members: [userId, res.data.userId],
    }).create();

    onClose();
    setNewChannelName('');
    setNewUseremail('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl mb-4">Create New Chat</h2>
        <input 
          type="text" 
          placeholder="Channel Name" 
          value={newChannelName} 
          onChange={(e) => setNewChannelName(e.target.value)} 
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input 
          type="text" 
          placeholder="User Email" 
          value={newUseremail} 
          onChange={(e) => setNewUseremail(e.target.value)} 
          className="mb-4 p-2 border border-gray-300 rounded w-full"
        />
        <div className="flex justify-end">
          <button 
            className="mr-2 p-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="p-2 bg-blue-500 text-white rounded"
            onClick={handleCreateChannel}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateChat;