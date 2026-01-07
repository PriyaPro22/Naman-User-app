"use client";

import { useState } from "react";
import { 
  Send, 
  Paperclip, 
  Smile, 
  Clock, 
  CheckCircle,
  ChevronLeft,
  Phone,
  Video,
  MoreVertical,
  X,
  User
} from "lucide-react";

const initialMessages = [
  { id: 1, text: "Hello! How can I help you today?", sender: "support", time: "10:00 AM" },
  { id: 2, text: "Hi, I need help with my order #ORD-2024-78945", sender: "user", time: "10:02 AM" },
  { id: 3, text: "I'd be happy to help with your order. Can you tell me what issue you're facing?", sender: "support", time: "10:03 AM" },
  { id: 4, text: "The delivery is delayed. It was supposed to arrive yesterday.", sender: "user", time: "10:04 AM" },
];

const quickReplies = [
  "Track my order",
  "Return request",
  "Refund status",
  "Cancel order",
  "Change delivery address",
  "Product issue"
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [agentTyping, setAgentTyping] = useState(false);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setAgentTyping(true);
    
    // Simulate agent reply
    setTimeout(() => {
      const agentMessage = {
        id: messages.length + 2,
        text: "Thank you for sharing the details. Let me check the status of your order.",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMessage]);
      setAgentTyping(false);
    }, 2000);
  };

  const handleQuickReply = (reply: string) => {
    const userMessage = {
      id: messages.length + 1,
      text: reply,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, userMessage]);
    setAgentTyping(true);
    
    setTimeout(() => {
      const responses: Record<string, string> = {
        "Track my order": "Sure! Let me pull up the tracking details for you. Can you confirm your order number?",
        "Return request": "I can help with your return. Please provide the order number and reason for return.",
        "Refund status": "Let me check the refund status for you. Please share your order number.",
        "Cancel order": "I'll help you cancel the order. Is the order still being processed?",
        "Change delivery address": "I can update the delivery address. Please provide the new address details.",
        "Product issue": "I'm sorry to hear that. Please describe the issue with the product."
      };
      
      const agentMessage = {
        id: messages.length + 2,
        text: responses[reply] || "How can I assist you with that?",
        sender: "support",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentMessage]);
      setAgentTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 max-w-md mx-auto shadow-xl relative">
      {/* Chat Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        {/* Device Info */}
        <div className="bg-gray-900 text-white text-xs px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Phone 12 Pro • 390 × 844 • 50% • No throttling • Save-Data</span>
          </div>
        </div>

        {/* Chat Info */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">Support Agent</h2>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-xs text-gray-500">Online • Instant response</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <Phone className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="px-4 py-4 pb-32">
        {/* Welcome Message */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Joined chat • Today at 10:00 AM</span>
          </div>
        </div>

        {/* Messages */}
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-3 ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <div className={`flex items-center gap-1 mt-1 text-xs ${
                  message.sender === "user" ? "text-blue-200" : "text-gray-500"
                }`}>
                  <span>{message.time}</span>
                  {message.sender === "user" && (
                    <CheckCircle className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {agentTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-bl-none p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Replies */}
        <div className="mt-6">
          <p className="text-sm text-gray-600 mb-2">Quick replies:</p>
          <div className="flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 p-3">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
            <Paperclip className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg">
            <Smile className="w-5 h-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              className="w-full px-4 py-2.5 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            onClick={sendMessage}
            disabled={!newMessage.trim()}
            className={`p-2.5 rounded-full ${
              newMessage.trim()
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-2 px-2">
          <p className="text-xs text-gray-500">Chat is secured with end-to-end encryption</p>
          <button className="text-xs text-blue-600 hover:text-blue-800">
            End chat
          </button>
        </div>
      </div>
    </div>
  );
}