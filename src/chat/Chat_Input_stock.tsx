import React, { useState } from "react";
import "./style/ChatScreen.css";
interface ChatInputStockProps {
    onSendMessage: (serverData: { date: string; company_name: string; stock_field: string }, displayMessage: string) => void;
  }

const ChatInput_stock: React.FC<ChatInputStockProps> = ({ onSendMessage }) => {
    const [date, setDate] = useState("");
    const[companyName, setCompanyName] = useState("");
    const [info, setInfo] = useState("");

    const handleSend = () => {
        if (date.trim() && companyName.trim() && info.trim()) {
          // Combine inputs into a single message
          const displayMessage  = `${date}, ${companyName}의 ${info}가 궁금해!`;
          const serverData = {
            date: date.trim(),
            company_name: companyName.trim(),
            stock_field: info.trim(),
          };
          onSendMessage(serverData , displayMessage);
    
          // Clear the inputs
          setDate("");
          setCompanyName("");
          setInfo("");
        }
      };

  return (
    <div className="chat-input-container-stock">
      <div className="input-fields">
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="날짜 (예: 2024-12-19)"
          className="stock-input"
        />
        <div>,</div>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="회사명"
          className="stock-input"
        />
        <div>의</div>
        <input
          type="text"
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          placeholder="정보 (예: 최저가)"
          className="stock-input"
        />
        <div>가 궁금해!</div>
      </div>
      <button className="send-button" onClick={handleSend}>
        입력
      </button>
    </div>
  );
};

export default ChatInput_stock;