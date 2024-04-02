import { io, Socket } from "socket.io-client";
export type Chat = {
  id: number;
  content: string;
  receiverId: number;
  senderId: number;
  shopId: number;
};
const token = () => localStorage.getItem("token");
let socket: Socket;
const listenSocket = (): (() => void) => {
  socket = io("http://localhost:3000", {
    auth: { token: token() },
  });
  auth();
  return () => socket.disconnect();
};

const auth = async () => {
  socket.emit("auth");
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

export { auth, sendChat, getAllChat, listenChat, listenSocket };
