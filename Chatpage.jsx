// Frontend/src/pages/ChatPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import ChatBubble from '../components/ChatBubble';
import MessageInput from '../components/MessageInput';
import { CiSearch } from "react-icons/ci";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! As your career coach, how can I assist you today?', isUser: false },
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text) => {
    const newUserMessage = { id: messages.length + 1, text, isUser: true };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // --- The API call has been updated ---
    try {
      // The API endpoint URL has changed to /chat/
      const response = await fetch('http://127.0.0.1:8000/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The request body now matches the new 'Message' Pydantic model
        body: JSON.stringify({
          user_id: "user123", // Using a sample user_id
          text: text,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const llmResponse = {
        id: messages.length + 2,
        text: data.reply, // The response format still has a 'reply' key
        isUser: false,
      };

      setMessages((prevMessages) => [...prevMessages, llmResponse]);

    } catch (error) {
      console.error("Failed to fetch from API:", error);
      const errorResponse = {
        id: messages.length + 2,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        isUser: false,
      };
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }
  };

  return (
    <div className="flex flex-col h-screen pt-16 bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for jobs..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
          <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>

        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;