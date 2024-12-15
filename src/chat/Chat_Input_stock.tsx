import React, { useState } from "react";
import "./style/ChatInput.css";
import { ArrowUp } from "react-feather";

interface ChatInputStockProps {
    onSendMessage: (serverData: { date: string; company_name: string; stock_field: string }, 
      displayMessage: string) => void;
  }

  const ChatInput_stock: React.FC<ChatInputStockProps> = ({ onSendMessage }) => {
    
    const companyOptions = [
      "삼성전자",
      "현대차",
      "LG에너지솔루션",
    ]; // Add more companies as needed
  
    const infoOptions = [
      "시가",
      "최고가",
      "최저가",
      "종가",
      "거래량",
    ];
  
    // State for selected options
    const [date, setDate] = useState<string>("");
    const [companyName, setCompanyName] = useState<string>("");
    const [info, setInfo] = useState<string>("");
  
    const handleSend = () => {
      if (date && companyName && info) {
        // Combine inputs into a single message
        const displayMessage = `${date}, ${companyName}의 ${info} 알려줘!`;
        const serverData = {
          date: date.trim(),
          company_name: companyName.trim(),
          stock_field: info.trim(),
        };
        onSendMessage(serverData, displayMessage);
    
          // Clear the inputs
          setDate("");
          setCompanyName("");
          setInfo("");
        }
      };

  return (
    <div className="chat-input-container-stock">
      <div className="input-fields">
        <div style={{marginLeft:"5px"}}/>
      <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="stock-input"
        />
        <div>,</div>
        {/* Company Name Dropdown */}
        <select
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="stock-input"
        >
          <option value="" disabled hidden>
            회사명
          </option>
          {companyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div>의</div>
        {/* Info Dropdown */}
        <select
          value={info}
          onChange={(e) => setInfo(e.target.value)}
          className="stock-input"
        >
          <option value="" disabled hidden>
            정보
          </option>
          {infoOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div>알려줘!</div>
      </div>
      <button className="send-button" onClick={handleSend}>
        <ArrowUp size={24}/>
      </button>
    </div>
  );
};

export default ChatInput_stock;