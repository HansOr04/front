// src/components/chat/ChatWidget.tsx

'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChat, useNotifications } from '@/hooks/useIntelcobro'

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, sendMessage } = useChat()
  const { addNotification } = useNotifications()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const messageText = inputValue.trim()
    setInputValue('')

    try {
      await sendMessage(messageText, false)
    } catch (error) {
      addNotification(
        'Error al enviar mensaje. Intenta más tarde.',
        'error'
      )
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleVoiceMessage = async () => {
    // TODO: Implement voice message functionality
    addNotification('Función de voz próximamente disponible', 'info')
  }

  if (!isOpen) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '350px',
      background: 'white',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
      overflow: 'hidden',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* Chat Header */}
      <div style={{
        background: 'var(--primary-dark)',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ fontSize: '1.5rem' }}>🤖</div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem' }}>Chat Inteligente</h3>
            <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
              {isLoading ? 'Escribiendo...' : 'En línea'}
            </p>
          </div>
        </div>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '5px',
            borderRadius: '50%',
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.1)'
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'
          }}
        >
          ✕
        </button>
      </div>
      
      {/* Chat Messages */}
      <div style={{
        height: '300px',
        overflowY: 'auto',
        padding: '15px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: '#f8f9fa'
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--gray-600)',
            padding: '2rem 1rem',
            fontSize: '0.9rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>👋</div>
            ¡Hola! Soy tu asistente virtual de Intelcobro. 
            <br />¿En qué puedo ayudarte hoy?
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              maxWidth: '85%',
              padding: '10px 15px',
              borderRadius: message.isUser ? '15px 15px 5px 15px' : '15px 15px 15px 5px',
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              background: message.isUser 
                ? 'var(--primary-red)' 
                : 'white',
              color: message.isUser ? 'white' : 'var(--primary-dark)',
              fontSize: '0.9rem',
              lineHeight: '1.4',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              position: 'relative'
            }}
          >
            <div>{message.message}</div>
            <div style={{
              fontSize: '0.7rem',
              opacity: 0.7,
              marginTop: '5px',
              textAlign: message.isUser ? 'right' : 'left'
            }}>
              {message.timestamp.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </div>
            
            {/* Audio player for voice responses */}
            {message.audioUrl && (
              <audio 
                controls 
                style={{ 
                  width: '100%', 
                  marginTop: '8px',
                  height: '30px'
                }}
              >
                <source src={message.audioUrl} type="audio/mpeg" />
                Tu navegador no soporta audio.
              </audio>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div style={{
            maxWidth: '85%',
            padding: '10px 15px',
            borderRadius: '15px 15px 15px 5px',
            alignSelf: 'flex-start',
            background: 'white',
            color: 'var(--primary-dark)',
            fontSize: '0.9rem',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              Escribiendo...
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div style={{
        padding: '15px',
        borderTop: '1px solid #eee',
        backgroundColor: 'white'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              style={{
                width: '100%',
                padding: '10px 15px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '0.9rem',
                resize: 'none',
                transition: 'border-color 0.2s'
              }}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              disabled={isLoading}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--primary-red)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ddd'
              }}
            />
          </div>
          
          {/* Voice message button */}
          <button
            onClick={handleVoiceMessage}
            disabled={isLoading}
            style={{
              background: 'var(--primary-green)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.2s',
              opacity: isLoading ? 0.5 : 1
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)'
            }}
          >
            🎤
          </button>

          {/* Send message button */}
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            style={{
              background: (!inputValue.trim() || isLoading) ? '#ccc' : 'var(--primary-red)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: (!inputValue.trim() || isLoading) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.2rem',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              if (inputValue.trim() && !isLoading) {
                (e.target as HTMLButtonElement).style.transform = 'scale(1.1)'
              }
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.transform = 'scale(1)'
            }}
          >
            {isLoading ? '⏳' : '➤'}
          </button>
        </div>
        
        {/* Character counter */}
        {inputValue.length > 100 && (
          <div style={{
            fontSize: '0.7rem',
            color: inputValue.length > 200 ? '#ef4444' : '#6b7280',
            textAlign: 'right',
            marginTop: '5px'
          }}>
            {inputValue.length}/500
          </div>
        )}
      </div>

      {/* Typing indicator CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .typing-indicator {
          display: flex;
          gap: 3px;
          margin-right: 8px;
        }

        .typing-indicator span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--primary-dark);
          opacity: 0.4;
          animation: typing 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: 0s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .typing-indicator span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          30% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  )
}