import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, X, Send, Phone, Mail, Minimize2 } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: number;
  sender_type: 'visitor' | 'admin';
  message: string;
  created_at: string;
}

interface ChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function ChatWidget({ isOpen, setIsOpen }: ChatWidgetProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [visitorInfo, setVisitorInfo] = useState({ name: '', email: '', phone: '' });
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<'info' | 'chat'>('info');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesRef = useRef<Message[]>([]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const fetchMessages = useCallback(async () => {
    if (!conversationId) return;
    try {
      const res = await axios.get(`/api/chat/messages/${conversationId}`);
      const newMessages = res.data;
      prevMessagesRef.current = newMessages;
      setMessages(newMessages);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  }, [conversationId]);

  useEffect(() => {
    if (isOpen && conversationId && !isMinimized) {
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, conversationId, isMinimized, fetchMessages]);

  const startConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!visitorInfo.name.trim() || !visitorInfo.email.trim()) {
      setError('Please fill in your name and email');
      return;
    }

    try {
      const res = await axios.post('/api/chat/start', {
        name: visitorInfo.name,
        email: visitorInfo.email,
        phone: visitorInfo.phone,
        message: newMessage || 'Hello!'
      });

      const newConvId = res.data.conversationId;
      setConversationId(newConvId);
      setStep('chat');
      setNewMessage('');
      
      await fetchMessages();
      
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, {
            id: Date.now(),
            sender_type: 'admin',
            message: "Thanks for reaching out! A team member will respond shortly. How can we help you today?",
            created_at: new Date().toISOString()
          }]);
        }, 1500);
      }, 500);
    } catch (err: any) {
      console.error('Failed to start conversation:', err);
      setError(err.response?.data?.error || 'Failed to start conversation');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !conversationId) return;

    const tempMessage: Message = {
      id: Date.now(),
      sender_type: 'visitor',
      message: newMessage,
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, tempMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      await axios.post('/api/chat/message', {
        conversationId,
        message: newMessage,
        senderType: 'visitor'
      });

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          sender_type: 'admin',
          message: "Thank you for your message! Our team typically responds within 30 minutes during business hours.",
          created_at: new Date().toISOString()
        }]);
      }, 1000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setIsTyping(false);
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(207,20,43,0.5)',
          zIndex: 9996
        }}
      >
        <MessageCircle size={28} style={{ color: 'white' }} />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 20, x: 20 }}
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 380,
        height: isMinimized ? 60 : 500,
        background: '#0f0f14',
        borderRadius: 16,
        border: '1px solid rgba(207,20,43,0.3)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 9997,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
      }}
    >
      <div style={{
        padding: '16px 20px',
        background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <MessageCircle size={20} style={{ color: 'white' }} />
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>
              JenQ Support
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#34D399'
              }} />
              <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11 }}>
                Online
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Minimize2 size={14} style={{ color: 'white', transform: isMinimized ? 'rotate(180deg)' : 'none' }} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={14} style={{ color: 'white' }} />
          </button>
        </div>
      </div>

      {isMinimized ? null : (
        <>
          {step === 'info' ? (
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: 'rgba(207,20,43,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 14px'
                }}>
                  <MessageCircle size={24} style={{ color: '#CF142B' }} />
                </div>
                <h3 style={{ color: 'white', fontSize: '1rem', fontWeight: 600, marginBottom: 6 }}>
                  Welcome to JenQ Support
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.4 }}>
                  Fill in your details to start a conversation.
                </p>
              </div>

              {error && (
                <div style={{
                  padding: '10px 14px',
                  background: 'rgba(239,68,68,0.15)',
                  borderRadius: 8,
                  color: '#fca5a5',
                  fontSize: 13,
                  marginBottom: 12
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={startConversation} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <input
                  type="text"
                  placeholder="Your Name *"
                  required
                  value={visitorInfo.name}
                  onChange={(e) => setVisitorInfo({ ...visitorInfo, name: e.target.value })}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={visitorInfo.email}
                  onChange={(e) => setVisitorInfo({ ...visitorInfo, email: e.target.value })}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={visitorInfo.phone}
                  onChange={(e) => setVisitorInfo({ ...visitorInfo, phone: e.target.value })}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <input
                  type="text"
                  placeholder="How can we help you? *"
                  required
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    padding: '12px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    outline: 'none',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '12px 16px',
                    background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                    border: 'none',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    marginTop: 4
                  }}
                >
                  Start Chat <Send size={16} />
                </button>
              </form>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 20,
                marginTop: 16,
                paddingTop: 16,
                borderTop: '1px solid rgba(255,255,255,0.06)'
              }}>
                <a href="tel:+18885550123" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none' }}>
                  <Phone size={14} /> Call Us
                </a>
                <a href="mailto:admin@jenqglobal.site" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.5)', fontSize: 12, textDecoration: 'none' }}>
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
          ) : (
            <>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                minHeight: 0
              }}>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      justifyContent: msg.sender_type === 'visitor' ? 'flex-end' : 'flex-start'
                    }}
                  >
                    <div style={{
                      maxWidth: '80%',
                      padding: '10px 14px',
                      borderRadius: msg.sender_type === 'visitor' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                      background: msg.sender_type === 'visitor'
                        ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)'
                        : 'rgba(255,255,255,0.08)',
                      color: 'white',
                      fontSize: 13,
                      lineHeight: 1.4
                    }}>
                      <p style={{ margin: 0, wordBreak: 'break-word' }}>{msg.message}</p>
                      <p style={{
                        margin: '4px 0 0',
                        fontSize: 10,
                        color: msg.sender_type === 'visitor' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.4)',
                        textAlign: msg.sender_type === 'visitor' ? 'right' : 'left'
                      }}>
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: 14,
                      background: 'rgba(255,255,255,0.08)',
                      display: 'flex',
                      gap: 4
                    }}>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.5)',
                            animation: 'typingBounce 1.4s infinite',
                            animationDelay: `${i * 0.2}s`
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              <form
                onSubmit={sendMessage}
                style={{
                  padding: 12,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  gap: 10,
                  flexShrink: 0
                }}
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    color: 'white',
                    fontSize: 13,
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                    border: 'none',
                    cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                    opacity: newMessage.trim() ? 1 : 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Send size={16} style={{ color: 'white' }} />
                </button>
              </form>
            </>
          )}
        </>
      )}

      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
        .chat-widget ::-webkit-scrollbar {
          width: 4px;
        }
        .chat-widget ::-webkit-scrollbar-track {
          background: transparent;
        }
        .chat-widget ::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.2);
          border-radius: 2px;
        }
      `}</style>
    </motion.div>
  );
}