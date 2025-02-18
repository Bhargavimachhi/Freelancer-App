import React, { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  ChannelList,
} from "stream-chat-react";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";
import "stream-chat-react/dist/css/v2/index.css";
import CreateChat from "../components/CreateChatButton";

const apiKey = "uu4gqeduxqn7";
const chatClient = StreamChat.getInstance(apiKey);

const Chatpage = () => {
  const [clientReady, setClientReady] = useState(false);
  const { user, isLoaded } = useUser();
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id);
      console.log(user.id);
      setUsername(user.fullName);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const connectUser = async () => {
      if (!userId || !username) return;

      const res = await axios.post("http://localhost:3000/getTokenbyClerkID", {
        userId: userId,
      });
      console.log(res.data);

      await chatClient.connectUser(
        { id: userId, name: username },
        res.data.token
      );
      setClientReady(true);
    };

    connectUser();

    // return () => chatClient.disconnectUser();
  }, [userId, username]);

  if (!clientReady) return <p>Loading chat...</p>;

  return (
    <>
      {/* // <Chat client={chatClient}>
    //   <ChannelList filters={{ members: { $in: [userId] } }} />
    //   <Channel>
    //     <ChannelHeader />
    //     <MessageList />
    //     <MessageInput />
    //   </Channel>
    // </Chat> */}
      <Chat client={chatClient}>
        <div className="flex h-screen">
          <div className="w-1/4 border-r border-gray-300">
            <button
              className="p-2 mt-4 text-white bg-blue-500 rounded"
              onClick={() => setIsModalOpen(true)}
            >
              Create Chat
            </button>
            <ChannelList filters={{ members: { $in: [userId] } }} />
          </div>
          <div className="flex flex-col w-3/4">
            <Channel>
              <ChannelHeader />
              <div className="flex-1 overflow-y-auto">
                <MessageList className="p-4" />
              </div>
              <div className="p-4 border-t border-gray-300">
                <MessageInput className="w-full" />
              </div>
            </Channel>
          </div>
        </div>
      </Chat>
      <CreateChat
        chatClient={chatClient}
        userId={userId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Chatpage;
