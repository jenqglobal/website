import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, User, Phone, Mail, Clock, CheckCircle, AlertCircle, Search, MoreVertical, FileText, Video, Image } from 'lucide-react';
import axios from 'axios';

interface Message {
  id: number;
  sender_type: 'visitor' | 'admin';
  message: string;
  created_at: string;
  is_read: number;
}

interface Conversation {
  id: number;
  visitor_name: string;
  visitor_email: string;
  visitor_phone: string;
  status: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
  unread?: number;
}

export default function ChatManager() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'open' | 'closed'>('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      fetchMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchConversations = async () => {
    try {
      const res = await axios.get('/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setConversations(res.data);
      
      const unreadRes = await axios.get('/api/chat/unread-count', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUnreadCount(unreadRes.data.count);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  const fetchMessages = async (conversationId: number) => {
    try {
      const res = await axios.get(`/api/chat/messages/${conversationId}`);
      setMessages(res.data);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      await axios.post('/api/chat/message', {
        conversationId: selectedConversation,
        message: newMessage,
        senderType: 'admin',
        senderId: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(prev => [...prev, {
        id: Date.now(),
        sender_type: 'admin',
        message: newMessage,
        created_at: new Date().toISOString()
      }]);

      setNewMessage('');
      fetchConversations();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const updateStatus = async (id: number, status: string) => {
    try {
      await axios.put(`/api/chat/conversations/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchConversations();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    if (filter === 'all') return true;
    if (filter === 'open') return conv.status === 'open';
    return conv.status === 'closed';
  }).filter(conv => {
    if (!searchQuery) return true;
    return conv.visitor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           conv.visitor_email.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  const currentConversation = conversations.find(c => c.id === selectedConversation);

  return (
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 120px)', 
      gap: 0,
      background: 'rgba(255,255,255,0.02)',
      borderRadius: 16,
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.06)'
    }}>
      {/* Conversation List */}
      <div style={{
        width: 340,
        borderRight: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(15,15,20,0.5)'
      }}>
        {/* Header */}
        <div style={{
          padding: 20,
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageCircle size={20} style={{ color: 'white' }} />
              </div>
              <div>
                <h2 style={{ color: 'white', fontSize: '1rem', fontWeight: 700, margin: 0 }}>Messages</h2>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  {conversations.length} conversations
                </span>
              </div>
            </div>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <Search size={16} style={{ color: 'rgba(255,255,255,0.3)' }} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'none',
                border: 'none',
                outline: 'none',
                color: 'white',
                fontSize: 13,
                width: '100%'
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          gap: 6
        }}>
          {(['all', 'open', 'closed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: filter === f ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)' : 'transparent',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
                color: 'white',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Conversation List */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {filteredConversations.length === 0 ? (
            <div style={{ 
              padding: 40, 
              textAlign: 'center', 
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%'
            }}>
              <MessageCircle size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
              <p style={{ fontSize: 13, margin: 0 }}>No conversations found</p>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <motion.div
                key={conv.id}
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                onClick={() => setSelectedConversation(conv.id)}
                style={{
                  padding: 16,
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  cursor: 'pointer',
                  background: selectedConversation === conv.id ? 'rgba(207,20,43,0.12)' : 'transparent',
                  borderLeft: selectedConversation === conv.id ? '3px solid #CF142B' : '3px solid transparent',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(207,20,43,0.2) 0%, rgba(1,33,105,0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <User size={18} style={{ color: '#CF142B' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                      <h4 style={{ color: 'white', fontWeight: 600, fontSize: 14, margin: 0 }}>
                        {conv.visitor_name || 'Anonymous'}
                      </h4>
                      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>
                        {formatTime(conv.last_message_at)}
                      </span>
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, margin: 0, marginBottom: 8 }}>
                      {conv.visitor_email}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: 13,
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: 180
                      }}>
                        {conv.last_message || 'No messages'}
                      </p>
                      <span style={{
                        fontSize: 10,
                        fontWeight: 600,
                        padding: '4px 8px',
                        borderRadius: 6,
                        background: conv.status === 'open' ? 'rgba(52,211,153,0.15)' : 'rgba(255,255,255,0.05)',
                        color: conv.status === 'open' ? '#34D399' : 'rgba(255,255,255,0.4)',
                        textTransform: 'capitalize'
                      }}>
                        {conv.status}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div style={{
              padding: '16px 24px',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(255,255,255,0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #CF142B 0%, #012169 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <User size={22} style={{ color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ color: 'white', fontWeight: 700, margin: 0, fontSize: '1rem' }}>
                    {currentConversation?.visitor_name || 'Anonymous'}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 4 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                      <Mail size={12} /> {currentConversation?.visitor_email}
                    </span>
                    {currentConversation?.visitor_phone && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>
                        <Phone size={12} /> {currentConversation.visitor_phone}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={16} />
                </button>
                <button style={{
                  width: 40,
                  height: 40,
                  borderRadius: 10,
                  background: currentConversation?.status === 'open' ? 'rgba(52,211,153,0.15)' : 'rgba(52,211,153,0.15)',
                  border: '1px solid rgba(52,211,153,0.3)',
                  color: '#34D399',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CheckCircle size={16} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflow: 'auto',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              background: 'linear-gradient(180deg, rgba(15,15,20,0.8) 0%, rgba(10,10,15,0.9) 100%)'
            }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender_type === 'admin' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '65%',
                    padding: '14px 18px',
                    borderRadius: msg.sender_type === 'admin' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender_type === 'admin'
                      ? 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)'
                      : 'rgba(255,255,255,0.08)',
                    color: 'white',
                    fontSize: 14,
                    lineHeight: 1.6,
                    boxShadow: msg.sender_type === 'admin' ? '0 4px 15px rgba(207,20,43,0.3)' : 'none'
                  }}>
                    <p style={{ margin: 0 }}>{msg.message}</p>
                    <p style={{
                      margin: '6px 0 0',
                      fontSize: 11,
                      color: msg.sender_type === 'admin' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.35)'
                    }}>
                      {msg.sender_type === 'admin' ? 'You' : currentConversation?.visitor_name} • {formatTime(msg.created_at)}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={sendMessage}
              style={{
                padding: 20,
                borderTop: '1px solid rgba(255,255,255,0.08)',
                display: 'flex',
                gap: 12,
                background: 'rgba(255,255,255,0.02)'
              }}
            >
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '4px 4px 4px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 14
              }}>
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'none',
                    border: 'none',
                    outline: 'none',
                    color: 'white',
                    fontSize: 14
                  }}
                />
                <button type="button" style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'transparent',
                  border: 'none',
                  color: 'rgba(255,255,255,0.4)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Image size={18} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!newMessage.trim()}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #CF142B 0%, #a01025 100%)',
                  border: 'none',
                  borderRadius: 12,
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: newMessage.trim() ? 'pointer' : 'not-allowed',
                  opacity: newMessage.trim() ? 1 : 0.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: '0 4px 15px rgba(207,20,43,0.3)'
                }}
              >
                <Send size={16} />
                Send
              </button>
            </form>
          </>
        ) : (
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(180deg, rgba(15,15,20,0.8) 0%, rgba(10,10,15,0.9) 100%)'
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 20
            }}>
              <MessageCircle size={36} style={{ color: 'rgba(255,255,255,0.2)' }} />
            </div>
            <h3 style={{ color: 'white', marginBottom: 8, fontSize: '1.25rem' }}>Select a conversation</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Choose a conversation from the left to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}