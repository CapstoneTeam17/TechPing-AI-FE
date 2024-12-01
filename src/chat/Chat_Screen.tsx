import React, { useState } from "react";
import Chat_Component from "./Chat_Component";
import ChatInput from "./Chat_Input";
import "./style/ChatScreen.css";
import ChatInput_stock from "./Chat_Input_stock";

interface Chat {
  id: number;
  content: string;
  isUser: boolean;
}

function ChatScreen() {
  const [chat, setChat] = useState<Chat[]>([
    { id: 1, content: "안녕하세요! 무엇을 도와드릴까요?", isUser: false },
  ]);

  const [input, setInput] = useState<string>("");
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  // 메시지 전송 핸들러
  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      setChat((prevChat) => {
        const newChat = [
          ...prevChat,
          {
            id: prevChat.length > 0 ? prevChat[prevChat.length - 1].id + 1 : 1,
            content: message.replace(/\n/g, "<br/>"), // Handle newlines
            isUser: true,
          },
        ];
        console.log("Updated chat:", newChat); // Debugging log
        return newChat;
      });
      setInput(""); // Clear the input field after sending
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsCategorySelected(true);
  };

  return (
    <div className="chat-screen">
      <div className="chat-container">
        {/* Chat Header */}
        <div className="chat-header">
          <p>스토기</p>
        </div>

        {/* Chat Messages */}
        <div id="chatContainer" className="chat-messages">
  {chat.map((chatItem) => (
    <Chat_Component
      key={chatItem.id}
      content={chatItem.content}
      isUser={chatItem.isUser}
    />
  ))}
</div>


        {/* Category Selection or Chat Input */}
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
        ) : selectedCategory === "주식 질문" ? (
          <ChatInput_stock onSendMessage={handleSendMessage} />
        ) : (
          <ChatInput
            onSendMessage={handleSendMessage}
            inputValue={input}
            setInputValue={setInput}
          />
        )}
      </div>
    </div>
  );
}

export default ChatScreen;
