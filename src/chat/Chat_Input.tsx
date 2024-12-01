import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  inputValue,
  setInputValue,
}) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleSend = () => {
    if (inputValue.trim() !== "") {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle any additional key events if needed
  };

  const handleCompositionStart = () => {
    setIsComposing(true);
  };

  const handleCompositionEnd = () => {
    setIsComposing(false);
  };

  return (
    <div className="chat-input-container">
      <textarea
        className="chat-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="스토기에게 무엇이든 물어보세요!"
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
      />
      <button className="send-button" onClick={handleSend}>
        입력
      </button>
    </div>
  );
};

export default ChatInput;
