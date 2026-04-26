"use client";

import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import { HapticButton } from './HapticButton';
import { cn } from '@/lib/utils';

export function AISupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([
    { role: 'ai', text: 'Welcome to the 1% Club. How can I assist you with your venture today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showEscalation, setShowEscalation] = useState(false);
  
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && chatRef.current) {
      gsap.fromTo(chatRef.current, 
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showEscalation]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { role: 'user' as const, text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: 'I understand you need assistance. While I can handle basic platform queries, it looks like you need direct executive support.' 
      }]);
      
      // Trigger escalation after the second message
      setTimeout(() => setShowEscalation(true), 1000);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-8 right-8 w-14 h-14 bg-fintech-accent text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,112,243,0.4)] transition-transform hover:scale-110 z-40",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className="fixed bottom-8 right-8 w-[380px] h-[500px] glass-card border border-white/10 z-50 flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/10 bg-black/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-fintech-accent/20 flex items-center justify-center text-fintech-accent">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">1% AI Assistant</h3>
                <p className="text-[10px] text-fintech-success uppercase tracking-widest font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-fintech-success animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-fintech-gray-400 hover:text-white transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "flex-row-reverse" : "")}>
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  msg.role === 'ai' ? "bg-fintech-accent/10 text-fintech-accent" : "bg-fintech-gray-200 text-fintech-gray-400"
                )}>
                  {msg.role === 'ai' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className={cn(
                  "p-3 rounded-2xl text-sm max-w-[75%]",
                  msg.role === 'ai' 
                    ? "bg-white/5 text-fintech-gray-200 rounded-tl-none" 
                    : "bg-fintech-accent text-white rounded-tr-none shadow-lg shadow-fintech-accent/20"
                )}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {showEscalation && (
              <div className="pt-4 border-t border-white/5 mt-4">
                <p className="text-center text-xs text-fintech-gray-400 mb-3">Connect with human executives.</p>
                <HapticButton 
                  className="w-full bg-white text-black hover:bg-gray-200 py-3 font-bold"
                  onClick={() => alert("Connecting to The ONES... (Executive Support Channel)")}
                >
                  Contact the ONES
                </HapticButton>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/20 flex gap-2">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..." 
              className="flex-1 bg-fintech-dark border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-fintech-accent/50"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-10 h-10 bg-fintech-accent text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
