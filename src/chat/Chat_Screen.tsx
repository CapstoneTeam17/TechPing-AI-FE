import React, { useEffect, useRef, useState } from "react";
import Chat_Component from "./Chat_Component";
import ChatType from "./Chat_type";
import "./style/ChatScreen.css";
import { sendStockQuestion, sendGeneralQuestion } from "./Chat_API";
import { handleApiError } from "./Chat_API";

interface Chat {
  id: number;
  content: string;
  isUser: boolean;
}

const ChatScreen: React.FC = () => {
  const [chat, setChat] = useState<Chat[]>([
    { id: 1, content: "안녕하세요! 무엇을 도와드릴까요?", isUser: false },
  ]);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Scroll to the bottom on chat update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  const handleSendMessage = async (serverData: any, displayMessage: string) => {
    setChat((prevChat) => [
      ...prevChat,
      { id: prevChat.length + 1, content: displayMessage, isUser: true },
    ]);
  
    try {
      const botMessage =
        selectedCategory === "주식 질문"
          ? await sendStockQuestion(serverData)
          : await sendGeneralQuestion({ prompt: serverData.prompt }); // "기타 질문" 처리
  
      setChat((prevChat) => [
        ...prevChat,
        { id: prevChat.length + 1, content: botMessage, isUser: false },
      ]);
    } catch (error: any) {
      const errorMessage = error.response
        ? handleApiError(error.response.status, error.response.data.error)
        : "네트워크 오류가 발생했습니다. 다시 시도해주세요.";
  
      setChat((prevChat) => [
        ...prevChat,
        { id: prevChat.length + 1, content: errorMessage, isUser: false },
      ]);
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategorySelected(true);
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        <div className="chat-header">
          <p>스토기</p>
        </div>
        <div className="chat-messages" ref={chatContainerRef}>
          {chat.map((item) => (
            <Chat_Component key={item.id} content={item.content} isUser={item.isUser} />
          ))}
        </div>
        {!isCategorySelected ? (
          <div className="category-selection">
            <p>질문 유형을 선택해주세요:</p>
            <button
              className="category-button"
              onClick={() => handleCategorySelect("주식 질문")}
            >
              주식 질문
            </button>
            <button
              className="category-button"
              onClick={() => handleCategorySelect("기타 질문")}
            >
              기타 질문
            </button>
          </div>
        ) : (
          <ChatType
            selectedCategory={selectedCategory}
            onSendMessage={handleSendMessage}
          />
        )}
      </div>
    </div>
  );
};

export default ChatScreen;

