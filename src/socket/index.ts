import { io, Socket } from "socket.io-client";
export type Chat = {
  id: number;
  content: string;
  receiverId: number;
  senderId: number;
  shopId: number;
};
const token = () => localStorage.getItem("token") || "";
let socket: Socket;
const listenSocket = (): (() => void) => {
  socket = io("http://localhost:3000", {
    extraHeaders: {
      authorization: token(),
    },
  });
  return () => socket.disconnect();
};
export interface RecentChat {
  id: number;
  content: string;
  createdAt: string;
  receiverId: number;
  senderId: number;
  shop: Shop;
}

export interface Shop {
  name: string;
  avatar: string;
  staffId: number;
}

const getRecentChats = () => {
  return new Promise<RecentChat[]>((resolve) => {
    socket.emit("user-finAll", (data: RecentChat[]) => resolve(data));
  });
};
const sendChat = (shopId: number, content: string) => {
  return new Promise<Chat>((resolve) => {
    socket.emit(
      "createChat",
      {
        content,
        shopId,
      },
      (data: Chat) => resolve(data)
    );
  });
};

const getAllChat = (shopId: number) => {
  return new Promise<Chat[]>((resolve) => {
    socket.emit("findAllChatByShop", shopId, (data: Chat[]) => resolve(data));
  });
};
const listenChat = (
  shopId: number,
  onNewChat: (chat: Chat) => void
): (() => void) => {
  socket.on("chat", (chat: Chat) => chat.shopId == shopId && onNewChat(chat));
  return () => socket.off("chat");
};

export { sendChat, getAllChat, listenChat, listenSocket, getRecentChats };
