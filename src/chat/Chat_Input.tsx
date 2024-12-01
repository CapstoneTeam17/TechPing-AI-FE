import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (prompt: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  inputValue,
  setInputValue,
}) => {
  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue); // 입력값 전달
      setInputValue(""); // 입력 필드 초기화
    }
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="스토기에게 무엇이든 물어보세요!"
      />
      <button className="send-button" onClick={handleSend}>
        입력
      </button>
    </div>
  );
};

export default ChatInput;
