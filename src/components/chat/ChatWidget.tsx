'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  message: string
  isUser: boolean
  timestamp: Date
}

interface ChatWidgetProps {
  isOpen: boolean
  onClose: () => void
}

export const ChatWidget = ({ isOpen, onClose }: ChatWidgetProps) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const sessionId = useRef(Math.random().toString(36).substr(2, 9))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      message: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      // Simular respuesta de la API por ahora
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          message: `Hola, soy el asistente de Intelcobro. Te ayudo con información sobre nuestros servicios de cobranza. ¿En qué puedo ayudarte?`,
          isUser: false,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, aiResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error('Error sending message:', error)
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage()
    }
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
          <h3 style={{ margin: 0 }}>Chat Inteligente</h3>
        </div>
        <button 
          onClick={onClose}
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'white', 
            cursor: 'pointer',
            fontSize: '1.2rem'
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
        gap: '10px'
      }}>
        {messages.length === 0 && (
          <div style={{
            textAlign: 'center',
            color: 'var(--gray-600)',
            padding: '2rem',
            fontSize: '0.9rem'
          }}>
            ¡Hola! Soy tu asistente virtual de Intelcobro. 
            <br />¿En qué puedo ayudarte hoy?
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              maxWidth: '80%',
              padding: '10px 15px',
              borderRadius: '15px',
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              background: message.isUser 
                ? 'var(--primary-red)' 
                : 'var(--background-light)',
              color: message.isUser ? 'white' : 'var(--primary-dark)',
              fontSize: '0.9rem',
              lineHeight: '1.4'
            }}
          >
            {message.message}
          </div>
        ))}
        
        {isLoading && (
          <div style={{
            maxWidth: '80%',
            padding: '10px 15px',
            borderRadius: '15px',
            alignSelf: 'flex-start',
            background: 'var(--background-light)',
            color: 'var(--primary-dark)',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              Escribiendo
              <span style={{ animation: 'pulse 1.5s infinite' }}>...</span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <div style={{
        padding: '15px',
        borderTop: '1px solid #eee',
        display: 'flex',
        gap: '10px'
      }}>
        <input
          style={{
            flex: 1,
            padding: '10px 15px',
            border: '1px solid #ddd',
            borderRadius: '20px',
            outline: 'none',
            fontSize: '0.9rem'
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Escribe tu mensaje..."
        />
        <button
          onClick={sendMessage}
          style={{
            background: 'var(--primary-red)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem'
          }}
        >
          →
        </button>
      </div>
    </div>
  )
}