import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatScreen from './chat/Chat_Screen';
import CategorySelection from './chat/Chat_Landing';
/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
  */
function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<CategorySelection />} />
      <Route path="/chat" element={<ChatScreen />} />
    </Routes>
  </Router>
  );
}

export default App;
