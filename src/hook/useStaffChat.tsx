import { useCallback, useEffect, useReducer } from "react";
import {
  RecentChat,
  Chat,
  getRecentChats,
  getAllChat,
  sendChat,
  listenChat,
  listenStartChat,
  getAllChatByStaff,
  sendChatByStaff,
  RecentStaffChat,
  getRecentChatsByStaff,
} from "../socket";
export interface ChatState {
  recentChats: RecentStaffChat[];
  selectedChat?: RecentStaffChat;
  recentLoading: boolean;
  chats: Chat[];
  chatLoading: boolean;
}
type ActionType =
  | "loaded-recent"
  | "new-chat"
  | "load-chat-user"
  | "loaded-chat-user"
  | "start-chat";
const reducer = (
  state: ChatState,
  action: { type: ActionType; data: unknown }
): ChatState => {
  switch (action.type) {
    case "loaded-recent":
      // Khi tải xong danh sách chat gần đây
      const recentChats = action.data as RecentStaffChat[];
      return { ...state, recentLoading: false, recentChats };
    case "load-chat-user":
      const userId = action.data as number;
      // Chọn hiển thị tin nhắn với shop nào
      const selectedChat = state.recentChats.find(
        (recent) => recent.userId === userId
      );
      // cùng lúc đó bắt đầu lấy danh sách tin nhắn (đổi trạng thái loading thành true)
      return { ...state, chatLoading: true, selectedChat };
    case "loaded-chat-user":
      // Sau khi đã lấy được danh sách tin nhắn cùng với shop đã chọn thì chuyển loading thành false và cập nhật chats
      const chats = action.data as Chat[];
      return { ...state, chatLoading: false, chats };
    case "new-chat":
      // Khi có tin nhắn mới
      const chat = action.data as Chat;
      let oldRecent: RecentStaffChat | undefined, newRecent: RecentStaffChat;
      // Lấy ra danh sách tin nhắn gần nhất
      //(bỏ đi tin nhắn có shopId trùng với tin nhắn mới  và gán nó vào oldRecent)
      const recents = state.recentChats.filter((recent) => {
        const bool = recent.userId === chat.userId;
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
      const isSameChat = chat.userId === state.selectedChat?.userId;
      // Thì thêm trực tiếp vào danh sách tin nhắn hiện tại(đang hiển thị ở messBox)
      if (isSameChat) state.chats.push(chat); // Nếu ko trùng thì thôi, chỉ cập nhật ở recent là đc r
      return { ...state, recentChats: recents };
    case "start-chat":
      const newRecentChat = action.data as RecentStaffChat;
      //
      const isExist = state.recentChats.find(
        (recent) => recent.shopId === newRecentChat.shopId
      );
      // Nếu đã từng nhắn với shop này rồi thì replace
      if (!isExist)
        // Thêm vào đầu recentChats (mới nhất) nếu chưa có
        state.recentChats.unshift(newRecentChat);
      // Mở hộp tin nhắn với shop này luôn
      state.selectedChat = newRecentChat;
      // Thêm tin nhắn này vào danh messBox
      state.chats = [newRecentChat];
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
const useStaffChat = (props: UseChatProps = {}) => {
  const onNewChat = props.onNewChat;
  const [state, dispatch] = useReducer(reducer, initState);
  useEffect(() => {
    getRecentChatsByStaff().then((recent) =>
      dispatch({ type: "loaded-recent", data: recent })
    );
    const unsubcribe1 = listenChat((chat) => {
      dispatch({ type: "new-chat", data: chat });
      onNewChat?.();
    });
    const unsubcribe2 = listenStartChat((chat) => {
      dispatch({ type: "start-chat", data: chat });
      onNewChat?.();
    });
    return () => {
      unsubcribe1();
      unsubcribe2();
    };
  }, []);
  const selectChatUser = useCallback(
    (userId: number) => {
      if (userId === state.selectedChat?.userId) return;
      dispatch({ type: "load-chat-user", data: userId });
      getAllChatByStaff(userId).then((chats) => {
        dispatch({ type: "loaded-chat-user", data: chats });
      });
    },
    [state.selectedChat]
  );
  const createChat = useCallback(
    (content: string) => {
      if (!state.selectedChat) return;
      sendChatByStaff(state.selectedChat.userId, content);
    },
    [state]
  );
  return { ...state, createChat, selectChatUser };
};

export default useStaffChat;
