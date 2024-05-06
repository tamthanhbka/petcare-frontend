import { useEffect, useState } from "react";
import { RecentChat, getRecentChats } from "../socket";

const useRecentChats = () => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<RecentChat[]>([]);
  useEffect(() => {
    getRecentChats().then((chats) => {
      setChats(chats);
      setLoading(false);
    });
  }, []);
  return { chats, loading };
};

export default useRecentChats;
