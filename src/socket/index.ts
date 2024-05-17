import { io, Socket } from "socket.io-client";
export interface Chat {
  id: number;
  content: string;
  userId: number;
  shopId: number;
  isFromUser: boolean;
  createdAt: string;
}
export interface RecentChat extends Chat {
  shop: Shop;
}
export interface Shop {
  id: number;
  name: string;
  avatar: string;
  staffId: number;
}

export interface User {
  id: number;
  name: string;
  avatar: string;
}

export interface RecentStaffChat extends Chat {
  user: User;
}

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

const getRecentChats = () => {
  return new Promise<RecentChat[]>((resolve) => {
    socket.emit("user-find-all", (data: RecentChat[]) => resolve(data));
  });
};
const sendChat = (shopId: number, content: string) => {
  return new Promise<Chat>((resolve) => {
    socket.emit(
      "user-create-chat",
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
    socket.emit("find-all-chat-by-shop", shopId, (data: Chat[]) =>
      resolve(data)
    );
  });
};
const listenChat = (onNewChat: (chat: Chat) => void): (() => void) => {
  socket.on("new-chat", onNewChat);
  return () => socket.off("new-chat");
};
const listenStartChat = (cb: (chat: RecentChat) => void): (() => void) => {
  socket.on("start-chat", cb);
  return () => socket.off("start-chat");
};
const startChatByUSer = (shopId: number) => {
  return new Promise<Chat>((resolve) => {
    socket.emit(
      "user-start-chat",
      {
        shopId,
      },
      (data: Chat) => resolve(data)
    );
  });
};

const getRecentChatsByStaff = () => {
  return new Promise<RecentStaffChat[]>((resolve) => {
    socket.emit("staff-find-all", (data: RecentStaffChat[]) => resolve(data));
  });
};

const sendChatByStaff = (userId: number, content: string) => {
  return new Promise<Chat>((resolve) => {
    socket.emit(
      "staff-create-chat",
      {
        content,
        userId,
      },
      (data: Chat) => resolve(data)
    );
  });
};

const getAllChatByStaff = (userId: number) => {
  return new Promise<Chat[]>((resolve) => {
    socket.emit("find-all-chat-by-user", userId, (data: Chat[]) =>
      resolve(data)
    );
  });
};
export {
  sendChat,
  getAllChat,
  listenChat,
  listenStartChat,
  listenSocket,
  getRecentChats,
  startChatByUSer,
  getRecentChatsByStaff,
  sendChatByStaff,
  getAllChatByStaff,
};
