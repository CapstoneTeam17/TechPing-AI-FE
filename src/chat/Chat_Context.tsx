import React, { createContext, useState, ReactNode, useContext } from "react";

// Define the chat type
interface Chat {
  id: number;
  content: string;
  isUser: boolean;
}

// Define the shape of the context
interface ChatContextType {
  chat: Chat[];
  addMessage: (message: Chat) => void;
}

// Create the context
const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Provider Component
export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chat, setChat] = useState<Chat[]>([
    { id: 1, content: "안녕하세요! 무엇을 도와드릴까요?", isUser: false },
  ]);

  const addMessage = (message: Chat) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  return (
    <ChatContext.Provider value={{ chat, addMessage }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook to use ChatContext
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
