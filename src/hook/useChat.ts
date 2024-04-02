import { useCallback, useEffect, useState } from "react";
import { getAllChat, listenChat, sendChat } from "../socket";
type Chat = {
  id: number;
  content: string;
  receiverId: number;
  senderId: number;
  shopId: number;
};
const useChat = (shopId: number) => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<Chat[]>([]);
  const addChat = (chat: Chat) => {
    chats.push(chat);
    setChats([...chats]);
  };
  const createChat = useCallback(
    (content: string) => sendChat(shopId, content).then(addChat),
    [chats, shopId]
  );
  useEffect(() => {
    getAllChat(shopId).then((chats) => {
      setChats(chats);
      setLoading(false);
    });
  }, [shopId]);
  useEffect(() => {
    return listenChat(shopId, addChat);
  }, [chats]);
  return [chats, loading, createChat] as const;
};
export { useChat };
