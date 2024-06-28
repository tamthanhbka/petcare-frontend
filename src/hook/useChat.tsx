import { useCallback, useEffect, useReducer } from "react";
import {
  RecentChat,
  Chat,
  getRecentChats,
  getAllChat,
  sendChat,
  listenChat,
  listenStartChat,
} from "../socket";
export interface ChatState {
  recentChats: RecentChat[];
  selectedChat?: RecentChat;
  recentLoading: boolean;
  chats: Chat[];
  chatLoading: boolean;
}
type ActionType =
  | "loaded-recent"
  | "new-chat"
  | "load-chat-shop"
  | "loaded-chat-shop"
  | "start-chat";
const reducer = (
  state: ChatState,
  action: { type: ActionType; data: unknown }
): ChatState => {
  switch (action.type) {
    case "loaded-recent":
      // Khi tải xong danh sách chat gần đây
      const recentChats = action.data as RecentChat[];
      return { ...state, recentLoading: false, recentChats };
    case "load-chat-shop":
      const shopId = action.data as number;
      // Chọn hiển thị tin nhắn với shop nào
      const selectedChat = state.recentChats.find(
        (recent) => recent.shopId === shopId
      );
      // cùng lúc đó bắt đầu lấy danh sách tin nhắn (đổi trạng thái loading thành true)
      return { ...state, chatLoading: true, selectedChat };
    case "loaded-chat-shop":
      // Sau khi đã lấy được danh sách tin nhắn cùng với shop đã chọn thì chuyển loading thành false và cập nhật chats
      const chats = action.data as Chat[];
      return { ...state, chatLoading: false, chats };
    case "new-chat":
      // Khi có tin nhắn mới
      const chat = action.data as Chat;
      let oldRecent: RecentChat | undefined, newRecent: RecentChat;
      // Lấy ra danh sách tin nhắn gần nhất
      //(bỏ đi tin nhắn có shopId trùng với tin nhắn mới  và gán nó vào oldRecent)
      const recents = state.recentChats.filter((recent) => {
        const bool = recent.shopId === chat.shopId;
        // Lấy ra recent chat có cùng shopId
        if (bool) oldRecent = recent;
        // Nếu shopId của tin nhắn mới và recent chat đó trùng với nhau thì loại đi
        return !bool;
      });
      // Nếu đã tồn tại recent chat rồi thì cập nhật lại recent chat và đưa nó lên đầu mảng
      if (oldRecent) {
        newRecent = {
          ...oldRecent,
          id: chat.id,
          content: chat.content,
          createdAt: chat.createdAt,
        };
        recents.unshift(newRecent);
      }
      // Nếu tin nhắn mới nằm trong chat list mà người dùng đang xem
      const isSameChat = chat.shopId === state.selectedChat?.shopId;
      // Thì thêm trực tiếp vào danh sách tin nhắn hiện tại(đang hiển thị ở messBox)
      if (isSameChat) state.chats.push(chat); // Nếu ko trùng thì thôi, chỉ cập nhật ở recent là đc r
      return { ...state, recentChats: recents };
    case "start-chat":
      const newRecentChat = action.data as RecentChat;
      //
      const isExist = state.recentChats.find(
        (recent) => recent.shopId === newRecentChat.shopId
      );
      // Nếu đã từng nhắn với shop này rồi thì replace
      if (!isExist) {
        // Thêm vào đầu recentChats (mới nhất) nếu chưa có
        state.recentChats.unshift(newRecentChat);
        return { ...state };
      }
      // Mở hộp tin nhắn với shop này luôn
      state.selectedChat = newRecentChat;
      return { ...state };
    default:
      return state;
  }
};
const initState: ChatState = {
  chatLoading: false,
  chats: [],
  recentChats: [],
  recentLoading: true,
};
type UseChatProps = {
  onNewChat?: () => void;
};
const useChat = (props: UseChatProps = {}) => {
  const onNewChat = props.onNewChat;
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    getRecentChats().then((recent) =>
      dispatch({ type: "loaded-recent", data: recent })
    );
    const unsubcribe1 = listenChat((chat) => {
      dispatch({ type: "new-chat", data: chat });
      onNewChat?.();
    });
    const unsubcribe2 = listenStartChat((chat) => {
      dispatch({ type: "start-chat", data: chat });
      getAllChat(chat.shopId).then((chats) => {
        dispatch({ type: "loaded-chat-shop", data: chats });
      });
      onNewChat?.();
    });
    return () => {
      unsubcribe1();
      unsubcribe2();
    };
  }, []);
  const selectChatShop = useCallback(
    (shopId: number) => {
      if (shopId === state.selectedChat?.shopId) return;
      dispatch({ type: "load-chat-shop", data: shopId });
      getAllChat(shopId).then((chats) => {
        dispatch({ type: "loaded-chat-shop", data: chats });
      });
    },
    [state.selectedChat]
  );
  const createChat = useCallback(
    (content: string) => {
      if (!state.selectedChat) return;
      sendChat(state.selectedChat.shopId, content);
    },
    [state]
  );
  return { ...state, createChat, selectChatShop };
};

export default useChat;
